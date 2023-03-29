<!--
 * @Author: liaowq
 * @Date: 2023-03-22 10:25:21
 * @Description: 请填写简介
-->
---
title: 大文件切片断点续传
date: 2023-03-22 10:25:25
sidebar: 'auto'
categories: 
 - 日常笔记
tags: 
 - upload
---

### 任务描述
1. 如何实现一个大文件上传
2. 上传中如何实现断点续传
3. 网络中断，刷新页面暂停，点击上传可以继续上传

### 整体思路
1. 将需要上传的文件切分成相同大小的数据块
2. 初始化一个分片上传任务，返回本次分片上传唯一标识
3. 将每个分片数据块上传到服务器
4. 最后一个分片上传完成后，额外发送一个merge请求，告诉服务端发送完成，服务器将小文件合并成大文件
5. 中断处理，错误处理

`File.prototype.slice` -> `获得bolb对象` -> 初始化分片上传任务 -> 发送ajax请求 -> 更新显示上传进度 -> 都上传完毕后merge请求
中断->

### 将文件分片成块
`File.prototype.slice`方法，继承的是`Blob`对象的`slice`方法

```javascript
/**
 * @param start blob对象的起始下标
 * @param end blob对象的结束下标
 * @returns 一个新的bold对象
 */
file.slice(start, end)
```
### 初始化分切上传任务
这个步骤主要是为了生成切片的唯一标识符
1. 可以使用`spark-md5`库，生成hash值
```javascript
const spark = new SparkMD5.ArrayBuffer();

// 当文件onload的时候读取文件，并将当前文件块的内容添加到spark中
const fileReader = new FileReader();
fileReader.onload = (e) =>{
  spark.append(e.target.result())

  // 添加完后，计算整个文件的md5值，调用后不再接受新的数据传输
  const md5 = spark.end()
}
```
2. 将得到的hash值传给后端，得到一个task初始值

### 将每个分片数据块上传到服务器
1. 将`header`的`content-type`设置成`application/octet-stream`，设置成二进制流，以确保以二进制形式处理文件
2. 用`promise-queue-plus`处理多个切片的请求
3. 可以在每次请求的时候，先请求预签名上传url，返回本次分片的请求url。确保：1.每次切片上传都是独立的；2.多个Promise队列时，每个切片请求的url一致的话可能导致问题

### 上传成功后处理
1. 单片文件上传完成后更新上传进度
2. 所有切片上传后，发送一个合并请求，服务端将所有切片合并一起

### 上传中断处理
1. 上传中断后，发送中断请求，将id传给后端
2. 每次上传的时候，根据文件的md5获取未上传完的任务
3. 每次请求前可以把当前的分片存储在一个字典里，如：
```javascript
const taskQueueDictionary = {}
taskQueueDictionary[md5] = worker // 按照hash值存储
```
4. 再去判断字典里是否存在当前hash的切片，如果有则表明是被暂停的，就可以开启重新上传，否则打开选择文件的窗口

示例代码如下：

```javascript
import SparkMD5 from 'spark-md5' // 计算hash
import PromiseQueue from 'promise-queue-plus' // 并列请求

// 每个分片的大小，比如以10m为例
const chunkSize = 10 * 1024 * 1024

// 字典用于存储上传worker
const taskQueueDictionary = {}

// 1. 文件分片，并计算hash值
const calculateHash = (file) => {
  return new Promise((resolve, reject) => {
    
    // 计算分片的数量
    const chunks = Match.ceil(file.size / chunkSize)
    let currentChunk = 0
    
    const fileReader = new FileReader() // 读取文件
    const spark = new SparkMD5.ArrayBuffer() // 追加数组缓冲区
    fileReader.onload = (e) => {
      spark.append(e.target.result)
      currentChunk++
      if(currentChunk < chunks){
        loadNext()
      }else{
        const md5 = spark.end() // 完成md5的计算，返回十六进制结果
        resolve(md5)
      }
    }

    fileReader.onerror = (e) => {
      reject(e)
    }

    function loadNext() {
      const start = currentChunk * chunkSize
      let end = start + chunkSize
      end > file.size && (end = file.size)
    }
  })
}
// 创建队列
const taskQue = PromiseQueue(1, {
  retry: 0, //Number of retries
  retryIsJump: false //retry now?
})

// 上传worker类
class UploadWorker {
  constructor(options){
    this.options = options
    this.task = options.task
  }

  /**
   * 上传逻辑处理，如果文件已经上传完成（完成分块合并操作），则不会进入到此方法中
   */
  initQueue(file, taskRecord) {
    let lastUploadedSize = 0; // 上次断点续传时上传的总大小
    let uploadedSize = 0; // 已上传的大小
    const totalSize = file.size || 0; // 文件总大小
    const { exitPartList, chunkSize, chunkNum, fileIdentifier } = taskRecord;

    const uploadNext = async (partNumber) => {
      const start = Number(chunkSize) * (partNumber - 1);
      const end = start + Number(chunkSize);
      const blob = file.slice(start, end);
      try {
        const url = await preSignUrl({
          identifier: fileIdentifier,
          partNumber: partNumber
        });

        // 上传切片
        await uploadChunk(url, blob);
        return Promise.resolve({ partNumber: partNumber, uploadedSize: blob.size });
      } catch (error) {
        return Promise.reject(`分片${partNumber}， 获取上传地址失败`);
      }
    }

    const updateProcess = (size) => {}

    return new Promise((resolve) => {
      const failArr = [];
      this.queue = PromiseQueue(3, {
        retry: 3, // Number of retries
        retryIsJump: false, // retry now?
        workReject: function (reason, queue) {
          failArr.push(reason);
        },
        queueEnd: function (queue) {
          resolve(failArr);
        }
      });
      for (let partNumber = 1; partNumber <= chunkNum; partNumber++) {
        const exitPart = (exitPartList || []).find((exitPart) => exitPart.partNumber == partNumber);
        if (exitPart) {
          // 分片已上传完成，累计到上传完成的总额中,同时记录一下上次断点上传的大小，用于计算上传速度
          lastUploadedSize += Number(exitPart.size);
          updateProcess(exitPart.size);
        } else {
          this.queue.push(() =>
            uploadNext(partNumber).then((res) => {
              // 单片文件上传完成再更新上传进度
              updateProcess(res.uploadedSize);
            })
          );
        }
      }
      if (this.queue.getLength() == 0) {
        // 所有分片都上传完，但未合并，直接return出去，进行合并操作
        resolve(failArr);
        return;
      }
      this.queue.start();
    });
  }

  async start() {
    const task = await taskInfo(this.options.md5, this.options.module);
    task.taskRecord.fileName = this.options.file.name;
    if (task) {
      this.task = task;
    }
    const errorList = await this.initQueue(this.options.file, this.task.taskRecord);
    
    if (errorList?.length > 0) {
      console.log('部分分片上传失败，请尝试重新上传文件');
      // 更新状态
      return;
    } 
  }

  stop() {}

  clear() {}
}

// 2. 上传预处理
const handlePreUpload = async(options) => {
  const { file } = options
  const identifier = await calculateHash(file)

  let task = await getTaskInfo(identifier) // 根据文件的md5请求获取未上传完的任务
  if(!task){
    const initTaskData = {
      identifier,
      fileName: file.name,
      totalSize: file.size,
      chunkSize
    }

    task = await initTask(initTaskData) // 如果没有task则请求init初始化任务
  }

  const worker = new UploadWorker({
    task,
    // ... 其他如onSuccess, state
  })

  // 把worker加入字典
  taskQueueDictionary[option.md5] = worker
}

// 3. 上传文件
const handleStartUpload = (item) => {
  const worker = taskQueueDictionary[item.fileIdentifier];
  // 若已有worker, 表明它是被暂停的
  if (worker) {
    worker.canStart = true;
    // 将worker加入队列执行
    taskQue.push(() => {
      worker.start();
    });
    taskQue.start();
  } else {
    // TODO: 如果不存在worker, 打开弹窗索取用户的file, 后续据此创建worker, 并加入队列执行
  }
};
```

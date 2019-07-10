package com.pinyougou.shop.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import entity.Result;
import util.FastDFSClient;

@RestController
public class UploadController {
	
	@Value("${FILE_SERVER_URL}")
	private String FILE_SERVER_URL;//获取配置文件中的url

	@RequestMapping("/upload")
	public Result upload(MultipartFile file) {
		//1. 获取文件的扩展名
		String filename = file.getOriginalFilename();
		String extName = filename.substring(filename.lastIndexOf(".")+1);
		
		try {
			//2 创建一个FastDFS服务器
			FastDFSClient fastDFSClient = new FastDFSClient("classpath:config/fdfs_client.conf");
			//3 执行上传操作
			String path = fastDFSClient.uploadFile(file.getBytes(), extName);
			//4 返回完整的路径
			String url = FILE_SERVER_URL+path;
			return new Result(true, url);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new Result(false, "上传失败");
		}
		
	}
}

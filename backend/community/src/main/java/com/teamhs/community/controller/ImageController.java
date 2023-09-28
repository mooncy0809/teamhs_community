package com.teamhs.community.controller;

import com.teamhs.community.service.ImageUploadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/images")
public class ImageController {
    @Autowired
    private ImageUploadService imageUploadService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            // 이미지 업로드 및 이미지 URL 반환
            String imageUrl = imageUploadService.uploadImage(image);

            //헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.valueOf(getMimeType(image.getOriginalFilename())));

            //로그
            final Logger logger = LoggerFactory.getLogger(BoardController.class);
            logger.info("receive_header {}", headers);
            logger.info("receive_getMimeType {}", getMimeType(image.getOriginalFilename()));
            logger.info("receive_imageUrl {}", imageUrl);

            return new ResponseEntity<>(imageUrl, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 파일 확장자에서 MIME 타입을 가져오는 함수
    private String getMimeType(String fileName) {
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        // 이미지 확장자에 따라 MIME 타입을 반환하도록 설정
        if ("jpg".equalsIgnoreCase(extension) || "jpeg".equalsIgnoreCase(extension)) {
            return "image/jpeg";
        } else if ("png".equalsIgnoreCase(extension)) {
            return "image/png";
        } else if ("gif".equalsIgnoreCase(extension)) {
            return "image/gif";
        } else {
            // 다른 확장자의 이미지에 대한 처리 추가
            return "image/jpeg"; // 기본값으로 설정
        }
    }
}
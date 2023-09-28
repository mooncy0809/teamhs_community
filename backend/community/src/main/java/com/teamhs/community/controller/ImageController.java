package com.teamhs.community.controller;

import com.teamhs.community.service.ImageUploadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/images/upload")
@CrossOrigin(origins = "http://localhost:3000") // React 앱의 주소로 변경
public class ImageController {
    @Autowired
    private ImageUploadService imageUploadService;

    @PostMapping("")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            // 이미지 업로드 및 이미지 URL 반환
            String imageUrl = imageUploadService.uploadImage(image);

            //헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(getMimeType(image.getOriginalFilename()));

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

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String fileName) {
        // 로컬 파일 시스템에서 이미지 파일을 읽어옴
        FileSystemResource resource = new FileSystemResource("D:/imagestest/upload/" + fileName);

        // 이미지 파일을 ResponseEntity로 감싸서 반환
        return ResponseEntity
                .ok()
                .contentType(getMimeType(fileName)) // 이미지 타입에 따라 변경
                .body(resource);
    }


    // 파일 확장자에서 MIME 타입을 가져오는 함수
    private MediaType getMimeType(String fileName) {
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        // 이미지 확장자에 따라 MIME 타입을 반환하도록 설정
        if ("jpg".equalsIgnoreCase(extension) || "jpeg".equalsIgnoreCase(extension)) {
            return MediaType.IMAGE_JPEG;
        } else if ("png".equalsIgnoreCase(extension)) {
            return MediaType.IMAGE_PNG;
        } else if ("gif".equalsIgnoreCase(extension)) {
            return MediaType.IMAGE_GIF;
        } else {
            // 다른 확장자의 이미지에 대한 처리 추가
            return MediaType.IMAGE_JPEG; // 기본값으로 설정
        }
    }
}
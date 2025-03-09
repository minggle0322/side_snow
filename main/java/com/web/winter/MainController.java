package com.web.winter;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/main")
    public ResponseEntity<String> main() {
        return ResponseEntity.ok("main page");
    }
}

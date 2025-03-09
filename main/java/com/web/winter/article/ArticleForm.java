package com.web.winter.article;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ArticleForm {

    private ArticleType articleType;

    private String title;

    private String content;
}

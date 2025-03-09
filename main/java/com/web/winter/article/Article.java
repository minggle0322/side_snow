package com.web.winter.article;

import com.web.winter.comment.Comment;
import com.web.winter.member.Member;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Entity @Getter
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private ArticleType articleType;

    private String title;

    private String content;

    @ManyToOne
    private Member author;

    private LocalDateTime createTime;

    //private LocalDateTime modifyTime;

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private List<Comment> commentList;

    public Article(ArticleType articleType, String title, String content, Member author, LocalDateTime createTime) {
        this.articleType = articleType;
        this.title = title;
        this.content = content;
        this.author = author;
        this.createTime = LocalDateTime.now();
    }
}


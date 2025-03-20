package com.web.winter.comment;

import com.web.winter.article.Article;
import com.web.winter.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Entity
@Getter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne
    private Member author;

    private LocalDateTime createTime;

    @ManyToOne
    private Article article;

    public Comment(String content, Member author, Article article) {
        this.content = content;
        this.author = author;
        this.createTime = LocalDateTime.now();
        this.article = article;
    }
}

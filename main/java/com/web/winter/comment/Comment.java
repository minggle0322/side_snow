package com.web.winter.comment;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @ManyToOne
    private Article article;

    public Comment(String content, Member author, LocalDateTime createTime, Article article) {
        this.content = content;
        this.author = author;
        this.createTime = createTime;
        this.article = article;
    }

    public void edit(String content, LocalDateTime editTime) {
        this.content = content;
        this.createTime = editTime;
    }
}

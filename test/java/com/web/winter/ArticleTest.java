package com.web.winter;

import com.web.winter.article.Article;
import com.web.winter.article.ArticleRepository;
import com.web.winter.article.ArticleType;
import com.web.winter.member.Member;
import com.web.winter.member.Position;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
public class ArticleTest {
    @Autowired
    private ArticleRepository articleRepository;

    @Test
    void testJpa() {
        Member m1 = new Member("id1","pw1","first", Position.SNOWBOARDER);
        Article a1 = new Article(ArticleType.FREE,"자유게시판-글-제목","자유게시판-글-내용",m1, LocalDateTime.now());
    }

}

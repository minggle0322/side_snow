package com.web.winter.article;

import com.web.winter.member.Member;
import com.web.winter.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;

    public List<Article> getArticles() {
        return articleRepository.findAll();
    }

    public List<Article> getFreeArticles() {
        return articleRepository.findAllByArticleType(ArticleType.FREE);
    }

    public List<Article> getGatherArticles() {
        return articleRepository.findAllByArticleType(ArticleType.GATHER);
    }

    public Article create(ArticleForm articleForm, Member author) {
        Article article = new Article(articleForm.getArticleType(), articleForm.getTitle(), articleForm.getContent(),
                author,LocalDateTime.now());
        return this.articleRepository.save(article);
    }

    public Optional<Article> getArticle(Long id) {
        return this.articleRepository.findById(id);
    }
}

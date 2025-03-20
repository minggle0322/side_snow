package com.web.winter.article;

import com.web.winter.member.Member;
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

    public Article createFreeArticle(ArticleForm articleForm, Member author) {
        Article article = new Article(ArticleType.FREE, articleForm.getTitle(), articleForm.getContent(),
                author, LocalDateTime.now());
        return this.articleRepository.save(article);
    }

    public Article createGatherArticle(ArticleForm articleForm, Member author) {
        Article article = new Article(ArticleType.GATHER, articleForm.getTitle(), articleForm.getContent(),
                author, LocalDateTime.now());
        return this.articleRepository.save(article);
    }

    public Optional<Article> getArticle(Long id) {
        return this.articleRepository.findById(id);
    }
}

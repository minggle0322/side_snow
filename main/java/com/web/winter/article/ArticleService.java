package com.web.winter.article;

import com.web.winter.comment.Comment;
import com.web.winter.comment.CommentRepository;
import com.web.winter.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final CommentRepository commentRepository;

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

    public Article editArticle(Article article, String title, String content, LocalDateTime editTime) {
        article.edit(title, content, editTime);
        return this.articleRepository.save(article);
    }

    public void deleteArticle(Article article) {
        this.articleRepository.delete(article);
    }

    public Optional<Article> getArticle(Long id) {
        return this.articleRepository.findById(id);
    }

    public List<Comment> getCommentList(Article article) {
        return this.commentRepository.findAllByArticle(article);
    }

    public Page<Article> getFreeArticles(int page) {
        Pageable pageable = PageRequest.of(page - 1, 10, Sort.by(Sort.Direction.DESC, "createTime"));
        return articleRepository.findByArticleTypeOrderByCreateTimeDesc(ArticleType.FREE, pageable);
    }

    public Page<Article> getGatherArticles(int page) {
        Pageable pageable = PageRequest.of(page - 1, 10, Sort.by(Sort.Direction.DESC, "createTime"));
        return articleRepository.findByArticleTypeOrderByCreateTimeDesc(ArticleType.GATHER, pageable);
    }
}

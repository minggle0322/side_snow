package com.web.winter.article;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findAllByArticleType(ArticleType articleType);

    Page<Article> findByArticleTypeOrderByCreateTimeDesc(ArticleType articleType, Pageable pageable);
}

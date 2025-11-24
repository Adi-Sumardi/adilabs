'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaCalendar, FaClock, FaTag, FaArrowRight } from 'react-icons/fa';
import { articles, Article } from '@/data/articles';
import ArticleDetail from './ArticleDetail';

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];

  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <section id="blog" className="py-20 bg-background relative overflow-hidden" ref={ref}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-amber-500/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Blog & Articles
            </span>
            <span className="ml-3">📝</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on modern web development
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-foreground hover:shadow-md hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Featured Articles</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  {/* Featured Badge */}
                  <div className="relative">
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs font-bold rounded-full">
                        FEATURED
                      </span>
                    </div>
                    <div className="h-48 bg-gradient-to-br from-blue-600 to-amber-500 flex items-center justify-center">
                      <span className="text-6xl">📰</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted mb-3">
                      <FaTag className="text-blue-600" />
                      <span>{article.category}</span>
                      <span className="mx-2">•</span>
                      <FaCalendar className="text-amber-600" />
                      <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <FaClock className="text-blue-600" />
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-muted mb-4 line-clamp-2">{article.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 transition-all duration-300"
                    >
                      Read More <FaArrowRight />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        {regularArticles.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6 text-foreground">Recent Articles</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + (featuredArticles.length * 0.1 + index * 0.1),
                  }}
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="h-32 bg-gradient-to-br from-blue-600 to-amber-500 flex items-center justify-center">
                    <span className="text-4xl">📄</span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted mb-2">
                      <FaTag className="text-blue-600" />
                      <span>{article.category}</span>
                      <span className="mx-1">•</span>
                      <FaClock className="text-amber-600" />
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-muted text-sm mb-3 line-clamp-2">{article.excerpt}</p>

                    <div className="flex items-center gap-2 text-xs text-muted mb-3">
                      <FaCalendar className="text-blue-600" />
                      <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
                    </div>

                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="flex items-center gap-2 text-blue-600 text-sm font-semibold hover:gap-4 transition-all duration-300"
                    >
                      Read More <FaArrowRight />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* No Articles Message */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted">No articles found in this category.</p>
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  );
}
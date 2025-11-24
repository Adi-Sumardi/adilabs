'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendar, FaClock, FaTag } from 'react-icons/fa';
import { Article } from '@/data/articles';

interface ArticleDetailProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArticleDetail({ article, isOpen, onClose }: ArticleDetailProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="sticky top-4 right-4 float-right z-10 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <FaTimes className="text-xl text-gray-600 dark:text-gray-300" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-amber-500 p-8 text-white">
                  <div className="flex items-center gap-2 text-sm text-blue-100 mb-4">
                    <FaTag className="text-amber-300" />
                    <span>{article.category}</span>
                    <span className="mx-2">•</span>
                    <FaCalendar className="text-amber-300" />
                    <span>{new Date(article.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                    <span className="mx-2">•</span>
                    <FaClock className="text-amber-300" />
                    <span>{article.readTime}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>

                  <p className="text-xl text-blue-100 leading-relaxed">{article.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Featured Badge */}
                  {article.featured && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-full font-bold mb-6">
                      <span>⭐</span>
                      <span>Featured Article</span>
                    </div>
                  )}

                  {/* Article Body */}
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {article.content.split('\n').map((paragraph, index) => {
                      // Handle headers
                      if (paragraph.startsWith('# ')) {
                        return (
                          <h1 key={index} className="text-4xl font-bold mt-8 mb-4">
                            {paragraph.replace('# ', '')}
                          </h1>
                        );
                      }
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-3xl font-bold mt-6 mb-3">
                            {paragraph.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={index} className="text-2xl font-bold mt-4 mb-2">
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      }

                      // Handle empty lines
                      if (paragraph.trim() === '') {
                        return <br key={index} />;
                      }

                      // Regular paragraphs
                      return (
                        <p key={index} className="text-muted leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Author Info */}
                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-amber-500 flex items-center justify-center text-3xl">
                        👨‍💻
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Adi Sumardi</h3>
                        <p className="text-muted">Fullstack Developer & Tech Enthusiast</p>
                      </div>
                    </div>
                  </div>

                  {/* Related Tags */}
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-4">Topics covered:</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 dark:from-blue-900/30 dark:to-amber-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Back Button */}
                  <div className="mt-8 text-center">
                    <button
                      onClick={onClose}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      ← Back to Articles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

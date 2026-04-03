"use client";

import { useState } from "react";
import { MessageCircle, User, Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";

interface Comment {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
  likes: number;
  liked: boolean;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "1",
    name: "Сарнай Б.",
    date: "2026-03-05",
    rating: 5,
    text: "Маш сайн бүтээгдэхүүн! Арьсанд маш зөөлөн, үнэр нь гайхалтай. Дахин захиалах болно.",
    likes: 12,
    liked: false,
  },
  {
    id: "2",
    name: "Болд Э.",
    date: "2026-02-28",
    rating: 4,
    text: "Чанар маш сайн, савлагаа гоё. Гэхдээ хүргэлт бага зэрэг удсан. Бүтээгдэхүүн өөрөө гайхалтай.",
    likes: 5,
    liked: false,
  },
  {
    id: "3",
    name: "Оюунаа Д.",
    date: "2026-02-15",
    rating: 5,
    text: "Найз бүсгүйдээ бэлэг авсан, маш их таалагдсан. Packaging нь premium харагдаж байна.",
    likes: 8,
    liked: false,
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function StarRating({
  rating,
  interactive = false,
  onRate,
}: {
  rating: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={`${
            interactive
              ? "cursor-pointer transition-transform hover:scale-110"
              : "cursor-default"
          }`}
        >
          <Star
            className={`h-4 w-4 ${
              star <= (hovered || rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-none text-gray-300"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

export function ProductComments({ productId }: { productId: string }) {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const avgRating =
    comments.reduce((sum, c) => sum + c.rating, 0) / comments.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      date: new Date().toISOString().split("T")[0],
      rating,
      text: text.trim(),
      likes: 0,
      liked: false,
    };

    setComments([newComment, ...comments]);
    setName("");
    setText("");
    setRating(0);
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const toggleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
          : c
      )
    );
  };

  return (
    <FadeIn>
      <div className="mt-8 border-t border-gray-100 pt-16 md:pt-24">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Сэтгэгдэл
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy md:text-3xl">
              Хэрэглэгчдийн сэтгэгдэл
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-sm font-medium text-gray-700">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-400">
                ({comments.length} сэтгэгдэл)
              </span>
            </div>
          </div>

          <Button
            onClick={() => setShowForm(!showForm)}
            className="h-12 rounded-xl border-2 border-navy bg-white px-6 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white w-fit"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Сэтгэгдэл бичих
          </Button>
        </div>

        {/* Success message */}
        {submitted && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-5 py-3.5 text-sm font-medium text-green-700">
            Таны сэтгэгдэл амжилттай нэмэгдлээ!
          </div>
        )}

        {/* Comment form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-gray-200 bg-gray-50/50 p-6 md:p-8"
          >
            <h3 className="text-base font-semibold text-navy">
              Сэтгэгдэл үлдээх
            </h3>

            {/* Rating */}
            <div className="mt-5">
              <label className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                Үнэлгээ
              </label>
              <div className="mt-2">
                <StarRating rating={rating} interactive onRate={setRating} />
              </div>
              {rating === 0 && (
                <p className="mt-1.5 text-sm text-gray-400">
                  Одоор үнэлнэ үү
                </p>
              )}
            </div>

            {/* Name */}
            <div className="mt-5">
              <label
                htmlFor="comment-name"
                className="text-sm font-semibold uppercase tracking-wider text-gray-700"
              >
                Нэр
              </label>
              <input
                id="comment-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Таны нэр"
                required
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-navy focus:ring-2 focus:ring-navy/20"
              />
            </div>

            {/* Comment text */}
            <div className="mt-5">
              <label
                htmlFor="comment-text"
                className="text-sm font-semibold uppercase tracking-wider text-gray-700"
              >
                Сэтгэгдэл
              </label>
              <textarea
                id="comment-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Бүтээгдэхүүний тухай сэтгэгдэлээ бичнэ үү..."
                required
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-navy focus:ring-2 focus:ring-navy/20"
              />
            </div>

            {/* Submit */}
            <div className="mt-6 flex gap-3">
              <Button
                type="submit"
                className="h-12 rounded-xl bg-navy px-8 text-sm font-semibold text-white hover:bg-navy/90"
              >
                Илгээх
              </Button>
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                className="h-12 rounded-xl border border-gray-200 bg-white px-6 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Болих
              </Button>
            </div>
          </form>
        )}

        {/* Comments list */}
        <div className="mt-10 space-y-0 divide-y divide-gray-100">
          {comments.map((comment) => (
            <div key={comment.id} className="py-6 first:pt-0">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
                  <User className="h-4.5 w-4.5" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Name + date */}
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                    <span className="text-sm font-semibold text-gray-900">
                      {comment.name}
                    </span>
                    <span className="text-sm text-gray-400">
                      {formatDate(comment.date)}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="mt-1.5">
                    <StarRating rating={comment.rating} />
                  </div>

                  {/* Text */}
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {comment.text}
                  </p>

                  {/* Like button */}
                  <button
                    onClick={() => toggleLike(comment.id)}
                    className={`mt-3 flex items-center gap-1.5 text-xs font-medium transition-colors ${
                      comment.liked
                        ? "text-navy"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <ThumbsUp
                      className={`h-3.5 w-3.5 ${
                        comment.liked ? "fill-navy" : ""
                      }`}
                    />
                    {comment.likes > 0 && comment.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

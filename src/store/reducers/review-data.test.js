import reviewData, { loadReviews, addReview } from './review-data';

const reviews = [
  {
    id: 1,
    user: {
      id: 15,
      name: 'Kendall',
    },
    rating: 9.2,
    comment: 'I personally found this movie to be boring. Definitely one of the most boring movies I&#39ve ever seen.',
    date: '2021-07-01T16:51:35.253Z',
  },
  {
    id: 2,
    user: {
      id: 17,
      name: 'Emely',
    },
    rating: 5.1,
    comment: 'I love this movie. This film is a milestone in cinematography. Great Immersive camera-work. This film is an experience and i has already seen it 4 times and I only see more quality of the film.',
    date: '2021-07-08T16:51:35.253Z',
  },
];

describe('Тестирование редьюсера reviewData', () => {
  it('Должен вернуть начальное состояние', () => {
    expect(reviewData(undefined, {}))
      .toEqual({
        reviews: [],
      });
  });

  it('Должен загрузить комментарии', () => {
    expect(reviewData({ reviews: [] }, loadReviews(reviews)))
      .toEqual({
        reviews: reviews,
      });
  });

  it('Должен добавить объект комментария в массив комментариев', () => {
    const reviewToPost = {
      id: 3,
      user: {
        id: 322,
        name: 'Nikita',
      },
      rating: 10,
      comment: 'KEKW.',
      date: '2021-06-08T16:51:35.233Z',
    };

    expect(reviewData({ reviews: reviews }, addReview(reviewToPost)))
      .toEqual({
        reviews: reviews.concat(reviewToPost),
      });
  });
});

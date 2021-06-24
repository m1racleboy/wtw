import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common.js';

const getCommentDate = () => dayjs().add(getRandomInteger(-2, -1), 'year')
  .add(getRandomInteger(1, 12), 'month')
  .add(getRandomInteger(1, 31), 'day')
  .toDate();

export const reviews = [
  {
    id: nanoid(),
    user: {
      id: nanoid(),
      name: 'Kate Muir',
    },
    rating: 8.9,
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the directors funniest and most exquisitely designed movies in years.',
    date: getCommentDate(),
  },
  {
    id: nanoid(),
    user: {
      id: nanoid(),
      name: 'Nikita Kulikov',
    },
    rating: 3.7,
    comment: 'Iuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu',
    date: getCommentDate(),
  },
  {
    id: nanoid(),
    user: {
      id: nanoid(),
      name: 'Artyom Kirillov',
    },
    rating: 5.9,
    comment: 'Len pisat',
    date: getCommentDate(),
  },
  {
    id: nanoid(),
    user: {
      id: nanoid(),
      name: 'Kirill Kondrashkin',
    },
    rating: 7.7,
    comment: 'Some comment',
    date: getCommentDate(),
  },
  {
    id: nanoid(),
    user: {
      id: nanoid(),
      name: 'Max Efimov',
    },
    rating: 5.8,
    comment: 'Z:GNINOghnewgbheirp]hn]dfjbmklp]dsnl;wkgnqwhkpdhgoqwhgiobn890bnerujiowhgqwebnghsdfujogbn3ruhgberuo.',
    date: getCommentDate(),
  },
  {
    id: nanoid(),
    user: {
      id: nanoid(),
      name: 'Oleg Flux',
    },
    rating: 6.4,
    comment: 'Kgnwerignber9w39thuire93y80tfgwer80g=h84ebgu0=h9wtyh801q23tg9-q2hwg89091-rty82w3e4gbvnsdipnvuol[abdfhsvgopa[s4829ty8-29345r23t8fngviedrhnwi0sghj.',
    date: getCommentDate(),
  },
  {
    id: nanoid(),
    user: {
      id: nanoid(),
      name: 'Anonymous',
    },
    rating: 9.5,
    comment: 'KNgwbnhuek;oegjwsodgnkpwerjh9onepwio;gh9ernbhipw39-ghnbdbh9gerikgh[p]9gbhjk;dfngb8i9eqwdgl;vhasxip]dbnwerk;gh9-sdhbnqwk;reghnip',
    date: getCommentDate(),
  },
];

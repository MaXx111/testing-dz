/**
 * @jest-environment jsdom
 */

import Widget from '../widget.js';

test('widget render widget', () => {
  document.body.innerHTML = '<div class="conteiner"></div>';
  const widget = new Widget('.conteiner');
  widget.bindToDOM();

  expect(document.querySelector('.conteiner').innerHTML).toEqual(Widget.htmlWidget);
});

test('widget render widget', () => {
  document.body.innerHTML = '<div class="conteiner"></div>';
  const conteiner = document.querySelector('.conteiner');
  const widget = new Widget(conteiner);
  widget.bindToDOM();

  expect(document.querySelector('.conteiner').innerHTML).toEqual(Widget.htmlWidget);
});

test.each([
  ['someting', '3530549488925172', 'jcb'],
  ['someting', '6011075895159255', 'discover'],
  ['someting', '5256361117188843', 'master'],
  ['someting', '4532451740587021', 'visa'],
  ['someting', '372354382463082', 'amex'],
  ['someting', '36932647302324', 'diners_club'],
  ['someting', '90', 'nothing'],
])(
  ('Should right type of cards'),
  (something, amount, expected) => {
    document.body.innerHTML = '<div class="conteiner"></div>';
    const widget = new Widget('.conteiner');

    const result = widget.typeOfCard(amount);

    expect(result).toBe(expected);
  },
);

test.each([
  ['someting', 'ff90', 'Ошибка! Вы ввели неправильный номер карты'],
  ['someting', '90', 'В нашей базе нет такого типа карт'],
])(
  ('widget submit'),
  (something, amount, expected) => {
    document.body.innerHTML = '<div class="conteiner"></div>';
    const widget = new Widget('.conteiner');
    widget.bindToDOM();
    widget.input.value = amount;
    widget.submit.click();

    const result = document.querySelector('.msg');

    expect(result.textContent).toEqual(expected);
  },
);

test('widget show right msg', () => {
  document.body.innerHTML = '<div class="conteiner"></div>';
  const widget = new Widget('.conteiner');
  widget.bindToDOM();
  widget.showMessage('jcb', '3530549488925172');

  const result = document.querySelector('.msg');

  expect(result.textContent).toEqual('Карта 3530549488925172 является частью платежной системы jcb');
});

test('widget should return true', () => {
  document.body.innerHTML = '<div class="conteiner"></div>';
  const widget = new Widget('.conteiner');
  widget.bindToDOM();

  const result = document.querySelector('.amex');
  result.classList.add('showCard');
  widget.clearCard();

  expect(result.className).not.toBe(true);
});

test('widget render widget', () => {
  document.body.innerHTML = '<div class="conteiner"></div>';
  const widget = new Widget('.conteiner');
  widget.bindToDOM();
  widget.input.value = 5593385391806392;
  widget.submit.click();

  const result = document.querySelector('.showCard');

  expect(result.className).toEqual('card master showCard');
});

export default class Widget {
  constructor(elem) {
    if (typeof elem === 'string') {
      elem = document.querySelector(elem);
    }
    this._elem = elem;
    this.bindToDOM = this.bindToDOM.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.typeOfCard = this.typeOfCard.bind(this);
    this.clearCard = this.clearCard.bind(this);
    this.showError = this.showError.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  static get htmlWidget() {
    return `
        <div class="widget">
            <h3 class="title">Напишите Ваш номер карты:</h3>
            <ul class="cards list-unstyled">
                <li><span class="card visa" title="Visa">Visa</span></li>
                <li><span class="card master" title="Mastercard">Mastercard</span></li>
                <li><span class="card amex" title="American Express">American Express</span></li>
                <li><span class="card discover" title="Discover">Discover</span></li>
                <li><span class="card jcb" title="JCB">JCB</span></li>
                <li><span class="card diners_club" title="Diners Club">Diners Club</span></li>
            </ul>
            <form id="form" class="form-inline" novalidate="novalidate">
                <div class="form-group">
                    <input class="form-control" id="card_number" name="card_number" type="text" placeholder="Номер карты" data-original-title="" title="">
                    <button id="submitform" class="btn btn-success">Проверить</button>
                </div>
            </form>
            <p class="msg hidden">222</p>
            </div>
        `;
  }

  static get selector() {
    return '.form-inline';
  }

  static get inputSelector() {
    return '.form-control';
  }

  static get submitSelector() {
    return '.btn';
  }

  bindToDOM() {
    this._elem.innerHTML = Widget.htmlWidget;

    this.form = this._elem.querySelector(Widget.selector);
    this.input = this.form.querySelector(Widget.inputSelector);
    this.submitt = this.form.querySelector(Widget.submitSelector);

    this.form.addEventListener('submit', this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();

    if (!Number(this.input.value)) {
      this.showError('notANumber');
      this.input.value = '';
      return false;
    }

    this.clearCard();

    if (this.typeOfCard(this.input.value) === 'nothing') {
      this.showError('nothing');

      this.input.value = '';
      return false;
    }

    this._elem.querySelector(`.${this.typeOfCard(this.input.value)}`).classList.add('showCard');
    this.showMessage(this.typeOfCard(this.input.value), this.input.value);
    this.input.value = '';

    return true;
  }

  typeOfCard(value) {
    if (/^(?:2131|1800|35)/.test(value)) {
      return 'jcb';
    }

    if (/^6(?:011|5)/.test(value)) {
      return 'discover';
    }

    if (/^5[1-5]/.test(value)) {
      return 'master';
    }

    if (/^4/.test(value)) {
      return 'visa';
    }

    if (/^3[47]/.test(value)) {
      return 'amex';
    }

    if (/^3(?:0[0-5]|[68])/.test(value)) {
      return 'diners_club';
    }

    return 'nothing';
  }

  clearCard() {
    if (this._elem.querySelector('.showCard')) {
      this._elem.querySelector('.showCard').classList.remove('showCard');
    }
  }

  showError(error) {
    if (error === 'notANumber') {
      this._elem.querySelector('.msg').textContent = 'Ошибка! Вы ввели неправильный номер карты';
      this._elem.querySelector('.msg').classList.remove('hidden');
    }

    if (error === 'nothing') {
      this._elem.querySelector('.msg').textContent = 'В нашей базе нет такого типа карт';
      this._elem.querySelector('.msg').classList.remove('hidden');
    }
  }

  showMessage(type, number) {
    this._elem.querySelector('.msg').textContent = `Карта ${number} является частью платежной системы ${type}`;
    this._elem.querySelector('.msg').classList.remove('hidden');
  }
}

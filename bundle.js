  'use strict';
  // get equip state
  class eqData {
    constructor(url) {
      const n = document.getElementById(url).getAttribute('src').slice(0, -4);
      const e = (d) => {
        this.rare = d[0];
        this.type = d[1];
        this.name = d[2];
        this.level = d[3];
        this.state = d[4];
        this.special = d[5];
      };
      if (n === 'aaaaa') {
        e(['S', 'a', '蓬莱の玉の枝', 1, [0,-400,466,0,0], false]);
      } else if (n === 'eeeee') {
        e(['R', 'a', '使い込まれた糸切り鋏', 4, [0,0,950,0,0], false]);
      } else if (n === 'fffff') {
        e(['S', 'a', '白騎士の槍', 5, [0,0,1200,0,0], false]);
      } else if (n === 'ggggg') {
        e(['R', 'a', '金の斧', 5, [0,0,1584,0,0], false]);
      } else if (n === 'bbbbb') {
        e(['R', 'b', '月神の十二単', 3, [0, 100, 292, 0, 0], false]);
      } else if (n === 'ccccc') {
        e(['S', 'd', '幻炎に映る聖樹', 4, [0,600,0,-600,0], [0,0,1760,0,0]]);
      } else if (n === 'ddddd') {
        e(['W', 's', 'タイガーリリー', 1, [0,0,416,480,0], false]);
      } else if (n === 'iiiii') {
        e(['S', 's', 'ギディ', 1, [0,0,584,0,0], false]);
      } else if (n === 'jjjjj') {
        e(['W', 's', 'チェネレントラ', 1, [0,0,884,0,0], [0,0,0,0,0]]);
      } else if (n === 'kkkkk') {
        e(['W', 's', '踊る紅剣士カーレン', 2, [0,0,484,0,0], false]);
      } else if (n === 'lllll') {
        e(['W', 's', 'ライラ王女', 3, [0,0,626,0,0], false]);
      } else if (n === 'mmmmm') {
        e(['S', 's', 'ヴォルフ', 5, [0,0,1316,0,0], false]);
      }
    }
  }

  // get char state
  class charState {
    constructor(n) {
      if (n === 1) {
        this[0] = [4400,6000,3800,1500,3470];
        this[1] = [4570,6210,3900,1600,3570];
        this[2] = [4740,6420,4000,3000,3670];
        this[3] = [4910,6640,4100,3100,3770];
        this[4] = [5080,6850,4200,3200,3870];
        this[5] = [5250,7060,4300,3300,3970];
        this[6] = [5420,7280,4400,3400,4070];
        this[7] = [5600,7500,4500,3500,4170];
        this.limit = [4300, 6600, 3000, 4500];
        this.limitMessage = ['小兵士1確','大兵士1確','小兵士1確','大兵士1確'];
      }
    }
  }

  const stateSet = () => {
    // dom create - form, level select
    const $levelSelect = document.createDocumentFragment().appendChild(document.createElement('select'));
    $levelSelect.setAttribute('name', 'levelSelect');
    for (let i = 0; i < 8; i++) {
      const $levelSelectOption = document.createElement('option');
      $levelSelectOption.insertAdjacentHTML('beforeend', 'level' + (i + 1));
      $levelSelect.insertAdjacentElement('beforeend', $levelSelectOption);
    }
    $levelSelect.selectedIndex = 7;


    // dom create - form, special select
    const $specialSelect = document.createDocumentFragment().appendChild(document.createElement('div'));
    for (let i = 0; i < 4; i++) {
      const $specialSelectList = document.createElement('p');
      $specialSelectList.style.color = '#fff';
      const $specialSelectCheckbox = document.createElement('input');
      $specialSelectCheckbox.setAttribute('type', 'checkbox');
      $specialSelectCheckbox.setAttribute('name', 'special');
      if (equips[i].special === false) {
        $specialSelectCheckbox.setAttribute('disabled', 'disabled');
      }
      const $specialSelectText = document.createTextNode(equips[i].name);
      $specialSelectList.appendChild($specialSelectCheckbox);
      $specialSelectList.appendChild($specialSelectText);
      $specialSelect.appendChild($specialSelectList);
    }


    $selector.setAttribute('name', 'selector');
    $selector.style.background = '#222';
    $selector.style.padding = '0.5em';
    $selector.insertAdjacentElement('beforeend', $levelSelect);
    $selector.insertAdjacentElement('beforeend', $specialSelect);
    document.getElementById('radio').insertAdjacentElement('afterend', $selector);

    // ステータスリストDOM作成
    const $stateDom = document.createDocumentFragment().appendChild(document.createElement('div'));
    $stateDom.setAttribute('id', 'stateList');
    const stateName = ['HP', 'MP', 'DS', 'SS', 'SP'];
    for (let i = 0; i < 5; i++) {
      const $stateDomItem = document.createElement('p');
      $stateDomItem.insertAdjacentHTML('beforeend', stateName[i]);
      $stateDomItem.setAttribute('class', 'stateItem');
      $stateDomItem.style.boxSizing = 'border-box';
      $stateDomItem.style.paddingLeft = '1em';
      $stateDomItem.style.transition = 'all 0.3s ease 0s';
      $stateDom.appendChild($stateDomItem);
    }
    document.selector.insertAdjacentElement('afterbegin', $stateDom);
  };












  // 各種ステータス変更
  const stateChange = () => {
    const char = new charState(1);
    let level = document.selector.levelSelect.selectedIndex;
    const state = char[level];
    const stateCalc = (eq, sp) => {
      if (level + 1 >= eq.level) {
        for (let i = 0; i < 5; i++) {
          state[i] = state[i] + eq.state[i];
          if (sp === true) {
            state[i] = state[i] + eq.special[i];
          }
        }
      }
    };
    const checkbox = (n) => {
      if (document.selector.special[n] != null) {
        return document.selector.special[n].checked;
      } else {
        return false;
      }
    };
    for (let i = 0; i < 4; i++) {
      stateCalc(equips[i], checkbox(i));
    }
    // Limitのチェック
    for (let i = 0; i < 5; i++) {
      const stateItem = document.getElementById('stateList').getElementsByClassName('stateItem')[i];
      const stateItemColor = (color) => {
        stateItem.style.background = ('linear-gradient(to right,rgba(255,255,255,1), rgba(' + color + ', 1) ' + bgWidth + ', rgba(' + color + ', 0) ' + bgWidth + ') , #aaa');
      };
      const stateLimit = (n, id, color) => {
        // spanがないか、idが違うなら
        if (stateItem.firstElementChild === null || stateItem.firstElementChild.getAttribute('id') != id) {
          // spanがあるなら
          if (stateItem.firstElementChild != null) {
            // span削除
            stateItem.removeChild(stateItem.firstElementChild);
          }
          // span作成
          const m = document.createElement('span');
          m.insertAdjacentText('beforeend' , (' - ' + char.limitMessage[n]));
          m.setAttribute('id', id);
          stateItem.insertAdjacentElement('beforeend', m);
        }
        stateItemColor(color);
      };
      if (state[i] > 10000) {
        state[i] = 10000;
      }
      const bgWidth = (state[i] / 100) + '%';
      if (i === 2 && char.limit[0] < state[i]) {
        if (char.limit[1] < state[i]) {
          stateLimit(1, 'limit1', '255, 100, 0');
          console.log(i)
        } else {
          stateLimit(0, 'limit2', '255, 150, 50');
        }
      } else if (i === 3 && char.limit[2] < state[i]) {
        if (char.limit[3] < state[i]) {
          stateLimit(3, 'limit3', '255, 100, 0');
        } else {
          stateLimit(2, 'limit4', '255, 150, 50');
        }
      } else {
        stateItemColor('255, 255, 100');
        if (stateItem.firstElementChild != null) {
          stateItem.removeChild(stateItem.firstElementChild);
        }
      }

    }
  };



  const equips = [new eqData('hoge'), new eqData('fuga'), new eqData('foo'), new eqData('bar')];
  const $selector = document.createDocumentFragment().appendChild(document.createElement('form'));
  stateSet();
  stateChange();
  $selector.addEventListener('change', stateChange);
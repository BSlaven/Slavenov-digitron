const input = document.getElementById("input");
const trenutno = document.getElementById("trenutno");
const tasteri = document.querySelectorAll(".taster");
const operacije = document.querySelectorAll(".operacije");
const jednako = document.getElementById("jednako");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const puta = document.getElementById("puta");
const podjeljeno = document.getElementById("podjeljeno");
const kvadrat = document.getElementById('kvadrat');
const zarez = document.getElementById('zarez');
const brišiUnos = document.getElementById('brišiInput');
const brišiSve = document.getElementById("brišiSve");

input.addEventListener('keydown', function(e) {
    const regex = RegExp('[0-9]');
    if (!regex.test(e.key)) {
        e.preventDefault();
    }
});

tasteri.forEach(taster => {
  taster.addEventListener('click', function() {
      input.value += taster.innerHTML;
  });
});

zarez.addEventListener('click', function() {
  if(input.value === '') return;
  else input.value += '.';
});

let činioci = [];
let račun;
operacije.forEach(oper => {
  oper.addEventListener('click', function() {
    if(input.value === '' && činioci.length === 0) return;
    if(činioci.length === 0 && input.value !== '') {
      činioci.push(parseFloat(input.value, 10), this.textContent);
      trenutno.innerHTML += input.value;
      input.value = null;
    } else if(činioci.length === 1 && input.value === '') {
      činioci.push(this.textContent);
    } else if(činioci.length === 2 && input.value === '') {
      činioci[1] = this.textContent;
    } else {
      činioci.push(parseFloat(input.value, 10));
      račun = eval(`${činioci[0]} ${činioci[1]} ${činioci[2]}`);
      trenutno.innerHTML += ` ${činioci[1]} ${input.value} = ${račun}`;
      činioci = [račun, this.textContent];
      input.value = null;
    }
  });
});

jednako.addEventListener('click', function() {
  if(činioci.length !== 2 || input.value === null) { return; }
  else {
    činioci.push(parseFloat(input.value, 10));
    račun = eval(`${činioci[0]} ${činioci[1]} ${činioci[2]}`);
    trenutno.innerHTML += ` ${činioci[1]} ${input.value} = ${račun}`;
    činioci = [račun];
    input.value = null;
  }
});

kvadrat.addEventListener('click', function() {
  let uneseniBrojKvadrat = parseFloat(input.value, 10);
  trenutno.innerHTML = Math.pow(uneseniBrojKvadrat, 2);
  input.value = trenutno.innerHTML;
});

korijen.addEventListener('click', function() {
  let uneseniBrojKorijen = parseFloat(input.value, 10);
  trenutno.innerHTML = Math.sqrt(uneseniBrojKorijen);
  input.value = trenutno.innerHTML;
});

brišiInput.addEventListener('click', function() {
  input.value = '';
});

brišiSve.addEventListener('click', function() {
  činioci = [];
  trenutno.innerHTML = null;
  input.value = null;
});

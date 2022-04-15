// we want to test if the console prints
console.log('hello')

function htmlSpeak() {
  document.querySelector('#content').innerText = this.name
}

class Person {
  name;
  speaker;

  constructor(name, speaker) {
    this.name = name;
    this.speaker = speaker;
  }

  speak() {
    this.speaker(this.name)
  }
}


const a = new Person('John', console.log)
const b = new Person('Mary', htmlSpeak)
a.speak();
b.speak();


const url = 'http://localhost:8080/posts/';

// event looks like
`
{
  ...,
  target: {
    value: ''
  }
}
`

const getPost = async ({target: {value}}) => {
  const response = await fetch(url + value);
  const data = await response.text();

  const [title, ...paragraphs] = data.split('\n').filter(line => !!line)

  const titleElem = document.createElement('h2');
  titleElem.innerText = title;

  const paragraphElem = document.createElement('div');
  paragraphElem.id="paragraphs"
  paragraphElem.innerHTML = paragraphs.map( paragraph => `
    <p>${paragraph}</p>
  `).join('')

  window.post.appendChild(titleElem)
  document.querySelector('#post').appendChild(paragraphElem)

}


const getPosts = async () => {
  const response = await fetch(url + 'list.txt');
  const data = await response.text();

  // data looks like
  `
  2022-04-14.txt
  2022-04-15.txt
  `
  console.log(data);

  const dropDown = document.querySelector("#posts");
  dropDown.removeAttribute('disabled');
   `
   <option>2022-04-14</option>
   <option>2022-04-15</option>
  `

  const posts = data.split('\n');
  console.log(posts);
  dropDown.innerHTML = posts.map( post => `<option>${post}</option>`);

  dropDown.removeEventListener('change', getPost)
  dropDown.addEventListener('change', getPost)

}

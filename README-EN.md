<div align="center">
    <h2>Tumbling</h2>
    <p align="center">
        <p>Simple and Powerful Library for Number Changing with zero dependencies</p>
        <a href="https://sheweichun.github.io/tumbling/build/simple/#/">
            <b>Demos »</b>
        </a>
    </p>
</div>

### Contents
* [Installation](#installation)
* [Usage](#usage)
* [Develop](#develop)


#### installation
* Install via [`npm`](https://www.npmjs.com/get-npm):

  ```console
  $ npm install tumbling
  ```


* or include within your HTML

  ```html
    <script src="https://path-to-project/dist/timnbling.min.js"></script>
  ```


#### Usage

##### DomNumberTumbling

```javascript
import {DomNumberTumbling} from 'tumbling';
import 'tumbling/index.css';
const domNumberTumbling = new DomNumberTumbling(el,{
    transitionTime:1500, //animation time
    value:1, 
    thousand:true //thousands
});
const domNumberTumbling.start();
setInterval(()=>{
    domNumberTumbling.update(Math.floor(domNumberTumbling.value + Math.random() * 100),{
    })
},3000)
```
...to be continued :smile:

#### develop

```sh
npm install
npm run dev
```


 
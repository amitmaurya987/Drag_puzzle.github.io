var items,categorys,dropItem;
const itemsBox = document.getElementById('items');
const catBox = document.getElementById('cat-box');
const button = document.getElementById('button');
const overlayer = document.querySelector('.overlayer');

button.addEventListener('click', handler);
load_data();


//Items
function load_data(){

    fetch('assets/database/items.json')

        .then(response => response.json())

        .then(result => {

            var data = ''

            result.map(value => {

                data += `<div class="item" draggable = "true" accesskey=${value.cid}>${value.name}</div>`;

            });

            itemsBox.innerHTML = data;
             items = document.getElementsByClassName('item');
            _drag();

        });


    //Catrgory

    fetch('assets/database/category.json')

        .then(resp => resp.json())

        .then(res => {

            var cat = '';
            
            res.map(value => {

                cat += `<div>
                            <h2>${value.name}</h2>
                            <div class="category category-1" accesskey=${value.id}></div>
                        </div>`;
            });

            catBox.innerHTML = cat;
             categorys = document.getElementsByClassName('category');
            _drop();
        });
}


//add event on category
    function _drag() {
        for (let i = 0; i < items.length; i++) {

            items[i].addEventListener('dragstart', dragStart);

            items[i].addEventListener('dragend', dragEnd);

        }
    }

//add event on item
    function _drop() {

        for (let i = 0; i < categorys.length; i++) {

            categorys[i].addEventListener('dragover', dragOver);

            categorys[i].addEventListener('drop', drovBox);

            categorys[i].addEventListener('dragleave', dragLeave);

        }
    }


    function dragStart() {

        this.classList.add('border-dot');
        //this.classList.add('drop');
        this.cloneNode(true);
        dropItem = this.cloneNode(true);
    }


    function dragEnd() {

      //  this.classList.remove('border-dot');

    }


    function dragOver(e) {

        e.preventDefault();

        this.classList.add('border-greeen');

    }


    function dragLeave() {

        this.classList.remove('border-greeen');

    }


    function drovBox() {


        dropItem.classList.remove('border-dot')
        this.appendChild(dropItem);
      //  this.appendChild(document.querySelector('.drop'));
        this.classList.remove('border-greeen');
        remove();

    }


    function remove() {

        for (let i = 0; i < items.length; i++) {

            items[i].classList.remove('drop');

        }
    }



    function handler() {

        var count = itemsBox.children.length;

        if (count > 0) {

            overlayer.innerHTML = "<div>Failed</div>";
            overlayer.classList.add('overlayer-show');
            overlayer.classList.add('failed');
            hide();

        } else {

            var msg;

            for (let i = 0; i < categorys.length; i++) {

                const cat_key = categorys[i].attributes.accesskey.value;

                const _item = categorys[i].children;

                for (let j = 0; j < _item.length; j++) {

                    let itemkey = _item[j].attributes.accesskey.value;

                    if (cat_key != itemkey){

                        msg = 0;
                    }

                }
            }

            if (msg == 0){

                overlayer.innerHTML = "<div>Failed</div>";
                overlayer.classList.add('overlayer-show');
                overlayer.classList.add('failed');
                hide();

            } else {

                overlayer.innerHTML = "<div>Sucess</div>";
                overlayer.classList.add('overlayer-show');
                overlayer.classList.add('success');
                hide();
            }
        }

    }

function hide(){
    
setTimeout(() =>{
    overlayer.classList.remove('overlayer-show');
    overlayer.classList.remove('failed');
    overlayer.classList.remove('success');
}, 2000);

}


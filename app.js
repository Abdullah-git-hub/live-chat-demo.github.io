const form = document.getElementById("txtType");
const txtul = document.getElementById("mainTxt");
const msgInBtn = document.getElementById("msg");
const sendBtn = document.getElementById("submitBtn");
const googleLoginBtn = document.getElementById("googleLogin")
const googleLogoutBtn = document.getElementById("googleLogout")
let userName, userImg, userId;

// Google Login
googleLoginBtn.addEventListener('click', function(){
    auth.signInWithPopup(provider).then(res=>{
        console.log(res);
        userName = res.user.displayName;
        userImg = res.user.photoURL;
        userId = res.user.uid;
        userinit(userName, userImg, userId);
        document.querySelector(".modal").style.display = 'none';
        document.querySelector('.modalBack').style.display = 'none';
        document.getElementsByTagName("header")[0].style.display = 'block';
        document.getElementsByTagName("section")[0].style.display = 'block';
    }).catch(err=>{
        console.log(err)
    })
})

googleLogoutBtn.addEventListener('click', function(){
    auth.signOut().then(() => {
        document.querySelector(".modal").style.display = 'block';
        document.querySelector('.modalBack').style.display = 'block';
        document.getElementsByTagName("header")[0].style.display = 'none';
        document.getElementsByTagName("section")[0].style.display = 'none';
      }).catch((error) => {
        console.log(error)
      });
})

// cheaking auth state
function checkAuthState(){
    auth.onAuthStateChanged(user=>{
        if(user){
            userinit(userName, userImg, userId);
            document.querySelector(".modal").style.display = 'none';
            document.querySelector('.modalBack').style.display = 'none';
            document.getElementsByTagName("header")[0].style.display = 'block';
            document.getElementsByTagName("section")[0].style.display = 'block';
        }
    })
}

// rendering user details
function userinit(name, img, id){
    document.getElementById("accname").innerHTML = name;
    document.getElementById("userimg").setAttribute("src", img);
    console.log("User Id Is: " + id);
}

// renderong function
function showData(doc){
    let txtli = document.createElement('li');
    let p = document.createElement('p');
    // let delspan = document.createElement('span');
    txtli.setAttribute('data-id', doc.id);

    p.textContent = doc.data().text;
    // delspan.textContent = 'delete';

    txtli.appendChild(p);
    // txtli.appendChild(delspan);
    txtul.appendChild(txtli);

    //deleting data

    // delspan.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     let del_id = e.target.parentElement.getAttribute('data-id');
    //     db.collection('users').doc(del_id).delete();
    // });
}

// getting & showing data
// db.collection('users').get().then(snapst => {
//     snapst.docs.forEach(doc => {
//         showData(doc);
//     });
// }).catch(err => {
//     `Failled to load. Error: ${err}`;
// });

// sending data
form.addEventListener('submit', (data) => {
    data.preventDefault();
    let sendDate = new Date();
    db.collection('users').add({
        // text: form.txtmsg.value,
        // text: `${username.innerText}: ${form.txtmsg.value}`,
        text: `${userName}: ${form.txtmsg.value}`,
        creditAt: sendDate,
    })

    form.txtmsg.value = '';

    console.clear();
    console.log("Messege added successfully !!!")
});

// real time data-base setup

db.collection('users').orderBy('creditAt').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type === 'added'){
            showData(change.doc);
        } else if(change.type === 'removed'){
            let li = txtul.querySelector(`[data-id=${change.doc.id}]`);
            txtul.removeChild(li);
        }
    })
});

function inittime(){
    var time = new Date();
    var hours, mins, ampm, date, month, year;
    if(time.getHours() < 13){
        hours = time.getHours();
        ampm = 'AM';
    } else if(time.getHours() >= 13){
        hours = time.getHours() - 12;
        ampm = 'PM';
    }

    mins = time.getMinutes();
    date = time.getDate();

    let montharr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    month = montharr[time.getMonth()];

    year = time.getFullYear();
    
    var sendTime = hours + ':' + mins + ' ' + ampm + ' ' + ' ' + date + ' ' + month + ' ' + year;
    return sendTime;
}

// 50aD6Sgyrza7uJpm2800fW3aOTC3
// 50aD6Sgyrza7uJpm2800fW3aOTC3

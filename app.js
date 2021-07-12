const form = document.getElementById("txtType");
const txtul = document.getElementById("mainTxt");
const msgInBtn = document.getElementById("msg");
const sendBtn = document.getElementById("submitBtn");
const googleLoginBtn = document.getElementById("googleLogin");
const googleLogoutBtn = document.getElementById("googleLogout");
const sideGoogleLogout = document.getElementById("sideGoogleLogout");
const closeBtn = document.querySelector(".close");
const showBtn = document.querySelector(".show");
const sideBar = document.querySelector(".sideBar");
const loginBox1 = document.getElementsByClassName("loginBox")[0];
const loginBox2 = document.getElementsByClassName("loginBox")[1];

// web events
showBtn.addEventListener('click', function(){
    sideBar.style.transform = "translateX(0%)";
})
closeBtn.addEventListener('click', function(){
    sideBar.style.transform = "translateX(100%)";
})

let userName, userImg, userId, pp;

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
        sideBar.style.transform = "translateX(100%)";
      }).catch((error) => {
        console.log(error)
      });
})

sideGoogleLogout.addEventListener('click', function(){
    auth.signOut().then(() => {
        document.querySelector(".modal").style.display = 'block';
        document.querySelector('.modalBack').style.display = 'block';
        document.getElementsByTagName("header")[0].style.display = 'none';
        document.getElementsByTagName("section")[0].style.display = 'none';
        sideBar.style.transform = "translateX(100%)";
      }).catch((error) => {
        console.log(error)
      });
})

// cheaking auth state
firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
        pp = user;
        console.log(pp)
        onloadUserinit(pp);
        userName = pp.displayName;
        userImg = pp.photoURL;
        userId = pp.uid;
        document.querySelector(".modal").style.display = 'none';
        document.querySelector('.modalBack').style.display = 'none';
        document.getElementsByTagName("header")[0].style.display = 'block';
        document.getElementsByTagName("section")[0].style.display = 'block';
    } else {
        console.log(user)
        document.querySelector(".modal").style.display = 'block';
        document.querySelector('.modalBack').style.display = 'block';
        document.getElementsByTagName("header")[0].style.display = 'none';
        document.getElementsByTagName("section")[0].style.display = 'none';
    }
  });

// rendering user details
function userinit(name, img, id){
    document.getElementById("accname").innerHTML = name;
    document.getElementById("userimg").setAttribute("src", img);
    document.getElementById("sideUserName").innerHTML = name;
    document.getElementById("sideUserImg").setAttribute("src", img);
    console.log("User Id Is: " + id);
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
}

function onloadUserinit(a){
    document.getElementById("accname").innerHTML = a.displayName;;
    document.getElementById("userimg").setAttribute("src", a.photoURL);
    document.getElementById("sideUserName").innerHTML = a.displayName;;
    document.getElementById("sideUserImg").setAttribute("src", a.photoURL);
    console.log("User Id Is: " + a.uid);
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
}

// renderong function
function showData(doc){
    let txtli = document.createElement('li');
    let p = document.createElement('p');
    // let delspan = document.createElement('span');
    let subP = document.createElement('p');
    txtli.setAttribute('data-id', doc.id);
    subP.classList.add("stime");

    p.textContent = doc.data().text;
    subP.textContent = doc.data().stime;
    // delspan.textContent = 'delete';

    txtli.appendChild(p);
    txtli.appendChild(subP);
    // txtli.appendChild(delspan);
    txtul.appendChild(txtli);

    // auto scrolling
    window.scrollTo(0, 9999);
    
    //deleting data

    // delspan.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     let del_id = e.target.parentElement.getAttribute('data-id');
    //     db.collection('users').doc(del_id).delete();
    // });
}

// sending data
form.addEventListener('submit', (data) => {
    data.preventDefault();
    let sendDate = new Date();
    let time = inittime();
    db.collection('users').add({
        // text: form.txtmsg.value,
        // text: `${username.innerText}: ${form.txtmsg.value}`,
        text: `${userName}: ${form.txtmsg.value}`,
        creditAt: sendDate,
        stime: time,
    })

    form.txtmsg.value = '';

    console.clear();
    console.log("Messege added successfully !!!")
});

// real time data-base setup

// db.collection('users').orderBy('creditAt').onSnapshot(snapshot =>{
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {
//         if(change.type === 'added'){
//             showData(change.doc);
//         } else if(change.type === 'removed'){
//             let li = txtul.querySelector(`[data-id=${change.doc.id}]`);
//             txtul.removeChild(li);
//         }
//     })
// });

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
    
    var sendTime = (hours + ':' + mins + ' ' + ampm + ' ' + ' ' + date + ' ' + month + ' ' + year);
    return sendTime;
}

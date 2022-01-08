const form = document.getElementById("txtType");
const previewForm = document.getElementById("previewTxtForm");
const previewSubmit = document.getElementById("previewSubmit");
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
let userName, userImg, userId, pp, imgFile, imgLink;

// web events
showBtn.addEventListener('click', function () {
    sideBar.style.transform = "translateX(0%)";
})
closeBtn.addEventListener('click', function () {
    sideBar.style.transform = "translateX(100%)";
})

// image preview
const photoInpt = document.getElementById("photo");
const previewImgCon = document.getElementsByClassName("imagePreview")[0];
const previewImg = document.getElementById("previewImg");
const cancleImg = document.getElementById("cancleImg");
const previewBack = document.getElementById("previewBack");

photoInpt.addEventListener("change", function () {
    imgFile = this.files[0];
    previewImgCon.style.display = "block";
    previewBack.style.display = "block";

    if (imgFile != undefined) {
        let reader = new FileReader();

        reader.addEventListener("load", function () {
            previewImg.setAttribute("src", this.result);
        });

        reader.readAsDataURL(imgFile);

    } else if (imgFile == undefined) {
        photoInpt.files[0] = null;
        previewImg.setAttribute("src", "");
    }
});

cancleImg.addEventListener("click", function () {
    photoInpt.files[0] = null;
    previewImg.setAttribute("src", "");

    previewImgCon.style.display = "none";
    previewBack.style.display = "none";
})


// Google Login
googleLoginBtn.addEventListener('click', function () {
    auth.signInWithPopup(provider).then(res => {
        console.log(res);
        userName = res.user.displayName;
        userImg = res.user.photoURL;
        userId = res.user.uid;
        userinit(userName, userImg, userId);
        document.querySelector(".modal").style.display = 'none';
        document.querySelector('.modalBack').style.display = 'none';
        document.getElementsByTagName("header")[0].style.display = 'block';
        document.getElementsByTagName("section")[0].style.display = 'block';
        window.reload()
    }).catch(err => {
        console.log(err)
    })
})

googleLogoutBtn.addEventListener('click', function () {
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

sideGoogleLogout.addEventListener('click', function () {
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
function userinit(name, img, id) {
    document.getElementById("accname").innerHTML = name;
    document.getElementById("userimg").setAttribute("src", img);
    document.getElementById("sideUserName").innerHTML = name;
    document.getElementById("sideUserImg").setAttribute("src", img);
    console.log("User Id Is: " + id);
    getData();
}

function onloadUserinit(a) {
    document.getElementById("accname").innerHTML = a.displayName;;
    document.getElementById("userimg").setAttribute("src", a.photoURL);
    document.getElementById("sideUserName").innerHTML = a.displayName;;
    document.getElementById("sideUserImg").setAttribute("src", a.photoURL);
    console.log("User Id Is: " + a.uid);
    getData();
}

var k;
// renderong function
function showData(doc) {
    let txtli = document.createElement('li');
    let p = document.createElement('p');
    // let delspan = document.createElement('span');
    let subP = document.createElement('p');
    let sendedImg = document.createElement("img");
    txtli.setAttribute('data-id', doc.id);
    k = doc.data();
    var photoUrl = k.imgLink;
    var accId = k.userId;
    if(userId == accId){
        txtli.classList.add("myMsg");
    }
    if(photoUrl != undefined){
        sendedImg.classList.add("sendedImg");
        sendedImg.setAttribute("src", photoUrl);
    }
    subP.classList.add("stime");
    p.textContent = k.text;
    subP.textContent = k.stime;
    // delspan.textContent = 'delete';
    txtli.appendChild(p);

    if(photoUrl != undefined){
        txtli.appendChild(sendedImg);
    }
    txtli.appendChild(subP);
    // txtli.appendChild(delspan);
    txtul.appendChild(txtli);

    // auto scrolling

    window.scrollTo(0, 99999);
    initImg();
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
    samTxt = form.txtmsg.value;
    finTxt = checkTxt(samTxt);
    db.collection('users').add({
        // text: form.txtmsg.value,
        // text: `${username.innerText}: ${form.txtmsg.value}`,
        text: `${userName}: ${finTxt}`,
        creditAt: sendDate,
        stime: time,
        userId,
    })

    form.txtmsg.value = '';

    console.clear();
    console.log("Messege added successfully !!!");
    // console.log(finTxt);
});

// preview form event
previewForm.addEventListener('submit', (data) => {
    data.preventDefault();
    previewSubmit.setAttribute("value", "Sending..");
    let sendDate = new Date();

    // geting imgLink
    let imgName = sendDate + "-" + imgFile.name;
    let metadata = {
        contentType: imgFile.type,
    }
    storage.child(imgName).put(imgFile, metadata)
    .then(snap => snap.ref.getDownloadURL())
    .then(url => {
    imgLink = url;
    let time = inittime();
    samTxt = previewForm.prerviewTxt.value;
    finTxt = checkTxt(samTxt);
    db.collection('users').add({
        text: `${userName}: ${finTxt}`,
        creditAt: sendDate,
        stime: time,
        imgLink,
        userId,
    })

    console.log(imgLink + " " + typeof(imgLink));

    previewForm.prerviewTxt.value = '';

    // console.clear();
    console.log("Messege added successfully !!!");
    photoInpt.files[0] = null;
    previewImg.setAttribute("src", "");

    previewImgCon.style.display = "none";
    previewBack.style.display = "none";
    })
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

function getData() {
    previewSubmit.setAttribute("value", "Send")
    db.collection('users').orderBy('creditAt').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === 'added') {
                showData(change.doc);
            } else if (change.type === 'removed') {
                let li = txtul.querySelector(`[data-id=${change.doc.id}]`);
                txtul.removeChild(li);
            }
        })
    });
}

function inittime() {
    var time = new Date();
    var hours, mins, ampm, date, month, year;
    if (time.getHours() < 13) {
        hours = time.getHours();
        ampm = 'AM';
    } else if (time.getHours() >= 13) {
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

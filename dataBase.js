// Initialize Firebase
var config = {
  apiKey: "AIzaSyDsmkR-JBXHZHbikcG1G9h9eRPxsMxW61w",
  authDomain: "topicos-e2a7d.firebaseapp.com",
  databaseURL: "https://topicos-e2a7d.firebaseio.com",
  projectId: "topicos-e2a7d",
  storageBucket: "topicos-e2a7d.appspot.com",
  messagingSenderId: "165691699646"
};
firebase.initializeApp(config);

var db = firebase.firestore();
function write(nombre, decisionTomada, callback){
  var docRef = db.collection("answers").doc(nombre);
  var allData = null;
  docRef.get().then(function(doc){
    if (doc.exists) {
        allData = doc.data;
        var valorActual = 0;
        if (isNaN(allData[decisionTomada])) {
          valorActual=1;
        }
        else {
          valorActual =allData[decisionTomada] + 1
        }
        docRef.update({
          [decisionTomada]:valorActual
        })
        .then(function() {
            console.log("Document sucessfully updated!");
            callback();
        })
        .catch(function(error){
          console.error("Error updating document");
          callback();
        })
    }
    else {
      docRef.set({
        [decisionTomada]:1
      }, {merge:true})
      .then(function(){
        console.log("Document Written");
        callback();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        callback();
      })
    }
  })
}
var decisionActual = document.getElementById("trebuche").value;
var url1 = document.getElementById("url1").value;
var url2 = document.getElementById("url2").value;
document.getElementById("opc1").onclick = function(){
      var decisionTomada = document.getElementById("txt1").innerHTML;
      write(decisionActual, decisionTomada, function(){window.location.href = url1})
}
document.getElementById("opc2").onclick = function(){
      var decisionTomada = document.getElementById("txt2").innerHTML;
      write(decisionActual, decisionTomada, function(){window.location.href = url2})
}

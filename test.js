const script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

$.ajax({
    type: "POST",
    url: "./algorithm/model.py",
    // data: { param: text}
}).done(function() {
    console.log('callback done')
});
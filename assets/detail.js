window.onload = function() {
    const location = window.location.href;
    const url = new URL(location);
    const search_params = new URLSearchParams(url.search); // object of url 

    if(!search_params.has('id') || search_params.get('id') == "") {
        window.location.href = "./";
    }

    fetch(`https://api.unsplash.com/photos/${search_params.get('id')}?client_id=${API_KEY}`).then(convert_to_json)
    .then(function(data) {
        loadDetail(data);

        //for heading Detail - 
        document.getElementById('image_id').innerText = search_params.get('id');
    });
}

function loadDetail(data) {
    console.log(data);
    document.getElementById('detail_image').src = data.urls.regular;
    //for image border color and ${} show its a variable
    document.getElementById('detail_image').style.borderColor = data.color; // console color 
    document.getElementById('description_text').innerText = data.description; // console description 
    document.getElementById('username').innerText = data.user.username; //google console user then check username
    document.getElementById('like_count').innerText = data.likes;//for likes and views
    document.getElementById('view_count').innerText = data.views;//for likes and views
    document.getElementById('alt_description').innerText = data.alt_description;
    document.getElementById('image_color').style.backgroundColor = data.color;
    document.getElementById('color_text').innerText = data.color;// use to show text of color 
    document.getElementById('download_link').href = data.links.download;

    // for fetch date from console window
    const date = new Date(data.created_at);
    const upload_date =`${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
    // getUTCMonth in js start from 0 that's why add 1
    document.getElementById('upload_date').innerText = upload_date;

    
    
}
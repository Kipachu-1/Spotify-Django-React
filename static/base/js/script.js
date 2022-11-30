let view_container_content = document.getElementById('view_container_content')
let playlist_add = document.getElementById('plus_btn');
let playlist_list = document.getElementById('playlist_list');
let library_btn = document.getElementById('library_btn');
let navbar = document.getElementById('nav_bar');
let details = document.querySelector('.details');
let navplaylistlists = document.getElementById('playlist_list');
let navactbtns = document.getElementById('act_btns');
let editbar = document.getElementById('editbar');
let editbtn = document.getElementById('editbtn');
let closebtnwd = document.getElementById('closebtnwd');
let main = document.getElementById('main');
let details_inner = document.querySelector('.details_inner');
let music_thumnail_img = document.querySelector('.music_thumnail_img');
let upbtns = document.querySelector(".upbtns");
let track_info = document.querySelector('.track-info')
let details_track_name = document.querySelector('.track-name');
let details_track_artist = document.querySelector('.track-artist');
let main_info_btns = document.getElementById('main_info');
let main_info_btns701 = document.getElementById('main_info701');
let details_inner_img_container = document.querySelector('.details-inner-img-container');
let player_wrapper = document.querySelector('.wrapper');
let slider_container_volume = document.querySelector('.slider_container_volume');
let yourlibrarylink = document.getElementById('yourlibrarylink');
let tapbar = document.querySelector('.tapbar');
let closeplayer = document.querySelector('.closeplayer');
let clickareaclose = document.querySelector('.clickareaclose');
let homelink = document.getElementById('homelink');
let likedbtnnav = document.getElementById('liked_btn')
let searchinput = document.getElementById('searchinput');
let searchlink = document.getElementById('searchlink');
let search_bar = document.getElementById('search-bar');
let root_top_bar = document.getElementById('root_top_bar');
let playpause_btn_closed = document.querySelector('.play-pause-btn')
let playerlikedbtn = document.querySelector('.playerlikedbtn');
const aStorage = window.localStorage;
let actionbtn = document.querySelector('.actionbtn');
let home_page_link = document.querySelector('.home_page_link');
let go_back = document.getElementById('go-back');
let go_forward = document.getElementById('go-forward');
let host_address = window.location.host;






if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    if(innerWidth<700)
    {var go_back_mobile = document.createElement('div');
    go_back_mobile.innerHTML = '<img src="/static/base/icons/arrow.svg" alt>';
    go_back_mobile.classList.add('go-btn');
    go_back_mobile.setAttribute('id', 'go_back_mobile');
    go_back_mobile.style = 'position:absolute;left:10px; top:20px;transform:rotate(270deg); width:20px; height:20px;'
    go_back_mobile.addEventListener('click', ()=>{
        history.back();
    })}
}
go_back.addEventListener('click', ()=>{
    history.back();
})
go_forward.addEventListener('click', ()=>{
    history.forward();
})

likedbtnnav.addEventListener('click', ()=>{
    if(!window.location.href.includes('/collection/'))
    {window.history.pushState({}, '', `http://${host_address}/collection/tracks`);
    clear_view_content();
    collection_likedsongs();}
})

window.ondragstart = function() { return false; }

playlist_add.addEventListener('click', async function(){
    let response = await (await fetch(`http://${host_address}/create/playlist/`)).json();
    let new_playlist_block = document.createElement('div');
    new_playlist_block.classList.add('playlist_block');
    new_playlist_block.dataset.id = response['uni_id'];
    new_playlist_block.innerHTML = `<div class='subblock'><h1 class='playlist_name'>${response['name']}</h1></div>`;
    playlist_list.appendChild(new_playlist_block);
    new_playlist_block.addEventListener('click', async function(){
        window.history.pushState({}, '', `http://${host_address}/playlist/${response['uni_id']}`);
        clear_view_content();
        collection_content(this.dataset.id, 'Playlist');
    })
})

window.addEventListener("touchstart", touchHandler, false);
function touchHandler(event){
    if(event.touches.length > 1){
        event.preventDefault()
    }
}

function emptyspace(){
    if(innerWidth < 700)
    {
    let space = document.createElement('div')
    space.style.width = "100%";
    space.style.minHeight = '200px';
    space.style.position ='relative';
    space.classList.add('space');
    if(view_container_content.childElementCount == 3) {
    view_container_content.appendChild(space);
}
}
}
async function homepack(){
    window.history.pushState({}, '', `http://${host_address}`);
    clear_view_content();
    home_content();
    other_block_content_home('Made for you');
    other_block_content_home('Based on recent listening');
}
homelink.addEventListener('click',()=> {
    if(window.location.pathname != '/')
    {homepack()}
})

home_page_link.addEventListener('click',()=>{
    if(window.location.pathname != '/')
    {homepack()}
})

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    navbar.classList.add('hidden-nav-bar');
        slider_container_volume.remove();
        player_wrapper.appendChild(main_info_btns701);
        player_wrapper.appendChild(slider_container_volume);
    main_info_btns.classList.add('main-info-hidden');
    clickareaclose.addEventListener('click', ()=>{
        if(innerWidth < 700)
        {show_mus();
        }
    });
    closeplayer.addEventListener('click', ()=> {
        hide_mus();
    });
    function forsearchbar(){
        if(window.location.href.includes('search')) {
            root_top_bar.style.display = 'flex';
        } else {
            if(window.innerWidth < 700){root_top_bar.style.display = 'none';}
        }
    }
    forsearchbar();

} else {
    main_info_btns701.remove();
    playpause_btn_closed.remove();
    clickareaclose.remove();
    editbar.remove();
    main_info_btns.remove();
    slider_container_volume.remove();
    player_wrapper.appendChild(main_info_btns);
    player_wrapper.appendChild(slider_container_volume);
    tapbar.remove();
    searchinput.addEventListener('click', ()=> {
        searchpage();
        AcivateSearch();
        if(window.location.href.includes('search') == false) {
        window.history.pushState({}, '', `http://${host_address}/search/`);
        forsearchbar();
     }
    })
}

yourlibrarylink.addEventListener('click', async function(){
    if(!window.location.href.includes(`/collection/playlists`)) {
    window.history.pushState({}, '', `http://${host_address}/collection/playlists`);
    clear_view_content();
    LibararyPage()
    other_block_content('Playlists');
}
})

searchlink.addEventListener('click', function(){
    searchpage();
    AcivateSearch();
    if(window.location.href.includes('search') == false) {
    window.history.pushState({}, '', `http://${host_address}/search/`);
    forsearchbar();
 }
})


library_btn.addEventListener('click', async function(){
    if(!window.location.href.includes('/collection/playlists'))
   { window.history.pushState({}, '', `http://${host_address}/collection/playlists`);
    clear_view_content();
    LibararyPage()
    other_block_content('Playlists');
}
})


document.querySelectorAll('.playlist_block').forEach(item => {
    item.addEventListener('click', async function(){
        window.history.pushState({}, '', `http://${host_address}/playlist/${this.dataset.id}`);
        clear_view_content();
        collection_content(this.dataset.id, 'Playlist');
    })
});

document.querySelectorAll('.playbtn_block').forEach(item => {
    item.addEventListener('click', async function(){
        let playlist_data = await fetch(`/get/playlist/${this.dataset.id}/info`);
        let data = await playlist_data.json();
        music_list = data['musics'];
        loadTrack(track_index);
        playTrack();

    })
});

// ==================================Local Storage================================

async function FollowedArtists()
{
    if(!aStorage.getItem('Artist_list'))
    {let Artist_list = await (await fetch(`http://${host_address}/artists/get/list`)).json();
    aStorage.setItem('Artist_list', JSON.stringify(Artist_list));}
}
FollowedArtists();
async function LikedSongs()
{
    if(!aStorage.getItem('LikedSongs'))
    {let LikedSongs = await (await fetch(`http://${host_address}/likedsongs/get/tracklist`)).json();
    aStorage.setItem('LikedSongs', JSON.stringify(LikedSongs));}
}
LikedSongs();
async function LibraryContent(){
    if(!aStorage.getItem('LibraryContent'))
    {let LibraryPlaylists = await (await fetch(`http://${host_address}/get/playlists/info`)).json();
    aStorage.setItem('LibraryPlaylists', JSON.stringify(LibraryPlaylists));
}
}

function checkTrack(id){
    if(JSON.parse(aStorage.getItem('LikedSongs')).includes(id)) {
        return true;
    } else {
        return false;
    }
}
async function updateLikedSongs(id, action){
    let list = aStorage.getItem('LikedSongs');
    let updated_list = JSON.parse(list);
    if(action == 'remove'){
        updated_list.splice(updated_list.indexOf(id), 1);
        await fetch(`http://${host_address}/likedsongs/remove/track/${id}`);
        actionmessage('Removed from Liked Songs');
    } else {
        if(!updated_list.includes(id)){updated_list.push(id);}
        await fetch(`http://${host_address}/likedsongs/add/track/${id}`);
        actionmessage('Added to Liked Songs');

    }
    aStorage.setItem('LikedSongs', JSON.stringify(updated_list));
    
}
function checkArtist(id){
    if(JSON.parse(aStorage.getItem('Artist_list')).includes(id)) {
        return true;
    } else {
        return false;
    }
}
async function updateArtistList(id, action){
    let list = aStorage.getItem('Artist_list');
    let updated_list = JSON.parse(list);
    if(action == 'remove'){
        updated_list.splice(updated_list.indexOf(id), 1);
        await fetch(`http://${host_address}/artists/remove/artist/${id}`);
        actionmessage('Removed from Your Library');
    } else {
        if(!updated_list.includes(id)){updated_list.push(id);}
        await fetch(`http://${host_address}/artists/add/artist/${id}`);
        actionmessage('Added to Your Library');

    }
    aStorage.setItem('Artist_list', JSON.stringify(updated_list));
}







// ================================Navigation pages===============================

window.onload = function(){
    let location = window.location.href;
    if (location.includes('/playlist/')) {
        clear_view_content();
        collection_content(location.substring(location.lastIndexOf('/') +1), 'Playlist');
    } else if(location.includes('/collection/tracks')) {
        clear_view_content()
        collection_likedsongs()
    } else if (location.includes('/track/')) {
        clear_view_content();
        collection_content(location.substring(location.lastIndexOf('/') +1), 'Track'); 
    } else if (location.includes('/search/')) {
        window.history.replaceState({}, '', `http://${host_address}/search/`);
        searchpage();
        AcivateSearch();
    } else if (location.includes('/artist/')) {
        clear_view_content();
        artist_content(location.substring(location.lastIndexOf('/') +1))
    } else if (location.includes('/collection/playlists')) {
        LibararyPage();
        other_block_content("Playlists");
    } else if (location.includes('/collection/artists')) {
        LibararyPage();
        other_block_content("Artists");
    } else if (location.includes('/collection/albums')) {
        LibararyPage();
        other_block_content("Albums");
    }   else if(window.location.pathname == "/") {
        homepack();
        sleep(1000).then(emptyspace);
    }
}
window.onpopstate = function(){
    let location = window.location.href;
    try {
    forsearchbar(); }
    catch {}
    if (location.includes('/playlist/')) {
        clear_view_content();
        collection_content(location.substring(location.lastIndexOf('/') +1), 'Playlist');
    } else if (location.includes('/search/')) {
        searchpage();
    } else if (location.includes('/collection/tracks')) {
        clear_view_content();
        collection_likedsongs();
    } else if (location.includes('/track/')) {
        clear_view_content();
        collection_content(location.substring(location.lastIndexOf('/') +1), 'Track'); 
    } else if (location.includes('/artist/')) {
        clear_view_content();
        artist_content(location.substring(location.lastIndexOf('/') +1))
    } else if (location.includes('/collection/playlists')) {
        clear_view_content();
        LibararyPage();
        other_block_content("Playlists");
    } else if (location.includes('/collection/artists')) {
        clear_view_content();
        LibararyPage();
        other_block_content("Artists");
    }   else if (location.includes('/collection/albums')) {
        clear_view_content();
        LibararyPage();
        other_block_content("Albums");
    } else if(window.location.pathname == "/") {
        homepack();
        sleep(1000).then(emptyspace);
    }
}


actionbtn.addEventListener('click', ()=>{
    playeractioncontent();

})

// =====================================Functions ==================================

function addtoplaylist_list(data){
    let new_playlist_block = document.createElement('div');
    new_playlist_block.classList.add('playlist_block');
    new_playlist_block.dataset.id = data['id'];
    if(data['name'].length > 20) {
        new_playlist_block.innerHTML = `<div class='subblock'><h1 class='playlist_name'>${data['name'].substring(0, 20)}...</h1></div>`;
    } else {
    new_playlist_block.innerHTML = `<div class='subblock'><h1 class='playlist_name'>${data['name']}</h1></div>`;}
    playlist_list.appendChild(new_playlist_block);
    new_playlist_block.addEventListener('click', async function(){
        if(!window.location.href.includes(data['id']))
        {window.history.pushState({}, '', `http://${host_address}/playlist/${data['id']}`);
        clear_view_content();
        collection_content(data['id'], 'Playlist');}
    })
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
function clear_view_content(){
    view_container_content.innerHTML = '';
}
async function Playlist_list() {
    let playlists = await (await fetch(`http://${host_address}/get/playlists/info`)).json();
    for(let i = 0; i < playlists.length; i++){
        addtoplaylist_list(playlists[i]);
    }
}
Playlist_list();

// =============================PAGE FUNCTIONS ======================================

async function home_content() {
    try {
        forsearchbar(); }
        catch {}
    let response = await fetch(`get/home/content`);
    playlists = await response.json();
    let container_block = document.createElement('div');
    container_block.classList.add('container_block');
    container_block.classList.add('container_block_1')
    let block_name = document.createElement('div');
    block_name.classList.add('block_name')
    block_name.innerHTML = "<h1>Good Afternoon</h1>"
    let section_block = document.createElement('div');
    let playlist_block = document.createElement('div');
    playlist_block.classList.add('played_playlist_block');
    playlist_block.classList.add('name_playlist_block');
    section_block.setAttribute('id', 'recently_played_playlists');
    section_block.classList.add('section_block');
    view_container_content.appendChild(container_block);
    container_block.appendChild(block_name);
    container_block.appendChild(section_block);
    for(i=0; i <6 ;i++){
        let playbtn_block = document.createElement('div');
        playbtn_block.classList.add('playbtn_block');
        playbtn_block.dataset.id = playlists[i]['id'];
        playbtn_block.innerHTML= '<i class="fa fa-play-circle fa-5x collection_btn"></i>'
        let playlist_block = document.createElement('div');
        playlist_block.dataset.id = playlists[i]['id'];
        playlist_block.classList.add('played_playlist_block');
        playlist_block.classList.add('name_playlist_block');
        let img = document.createElement('div');
        let img_img = document.createElement('img');
        img_img.setAttribute('src', playlists[i]['thumnail']);
        img_img.classList.add('img_container_block');
        let playlist_name = document.createElement('div');
        let p = document.createElement('p');
        p.innerText = playlists[i]['name'];
        playlist_name.classList.add('playlist_name');
        playlist_name.appendChild(p);
        img.classList.add('img_container_block');
        img.appendChild(img_img);
        playlist_block.appendChild(img);
        playlist_block.appendChild(playlist_name);
        playlist_block.appendChild(playbtn_block);
        section_block.appendChild(playlist_block);
        playlist_block.addEventListener('click', async function(){
            window.history.pushState({}, '', `http://${host_address}/playlist/${this.dataset.id}`);
            clear_view_content();
            collection_content(this.dataset.id, 'Playlist');
        })
        playbtn_block.addEventListener('click', async function(){
            let data = await (await fetch(`/get/playlist/${this.dataset.id}/info`)).json();
            music_list = await data['musics'];
            loadTrack(track_index);
            playTrack();
    });
    }
    emptyspace()
}

async function other_block_content_home(section){
    let playlists = await fetch(`/get/RecPlaylists/info`);
    let data = await playlists.json();
    let container_block = document.createElement('div');
    let block_name = document.createElement('div');
    let section_block = document.createElement('div');
    container_block.classList.add('container_block');
    block_name.classList.add('block_name');
    section_block.classList.add('section_block');
    section_block.classList.add('section_block_other')
    block_name.innerHTML = `<h1>${section}</h1>`
    container_block.appendChild(block_name);
    container_block.appendChild(section_block);
    for(var i = 0; i < 6; i++) {
    let block_info = document.createElement('div');
    let name_playlist_block = document.createElement('div');
    let img_container_block_other = document.createElement('div');
    let img_container_block_other_img = document.createElement('img');
    let other_block_btn = document.createElement('div')
    let bla_bla = document.createElement('div');
    let bla_bla_p = document.createElement('p');
    other_block_btn.innerHTML = '<i class="fa fa-play-circle fa-5x playbtn_block_icon"></i>';
    bla_bla_p.innerText = data[i]['name'];
    img_container_block_other_img.setAttribute('src', data[i]['thumnail']);
    other_block_btn.dataset.id = data[i]['id'];
    block_info.classList.add('block_info');
    name_playlist_block.classList.add('name_playlist_block');
    name_playlist_block.dataset.id = data[i]['id'];
    img_container_block_other.classList.add('img_container_block_other');
    img_container_block_other_img.classList.add('img_container_block_other');
    other_block_btn.classList.add('other_block_btn');
    bla_bla.classList.add('bla_bla');
    bla_bla.appendChild(bla_bla_p);
    section_block.appendChild(name_playlist_block);
    name_playlist_block.appendChild(block_info);
    block_info.appendChild(img_container_block_other);
    block_info.appendChild(bla_bla);
    img_container_block_other.appendChild(img_container_block_other_img);
    img_container_block_other.appendChild(other_block_btn);
    other_block_btn.addEventListener('click', async function() {
        let playlist_data = await fetch(`/get/playlist/${this.dataset.id}/info`);
        let data = await playlist_data.json();
        music_list = data['musics'];
        loadTrack(track_index);
        playTrack();
    });
    name_playlist_block.addEventListener('click', async function(){
            window.history.pushState({}, '', `http://${host_address}/playlist/${this.dataset.id}`);
            clear_view_content();
            collection_content(this.dataset.id, "Playlist");
        });
    view_container_content.appendChild(container_block);
}
emptyspace();
}

async function collection_likedsongs() {
    var data = await (await fetch(`http://${host_address}/likedsongs/get/info`)).json();
    let playlist_info = document.createElement('div');
    let info_container = document.createElement('div');
    let playlist_img = document.createElement('div');
    let playlist_info_block = document.createElement('div');
    let playlist_img_img = document.createElement('img');
    let playlist_info_type = document.createElement('p');
    let playlist_info_authors = document.createElement('p');
    let playlist_author_length = document.createElement('p');
    let playlist_info_name = document.createElement('h1');
    let editbtn_img = document.createElement('img');
    let likedbtn_img = document.createElement('img');
    let act_area = document.createElement('div');
    let btn_list = document.createElement('div');
    let playbtn = document.createElement('div');
    let musics_list = document.createElement('div');
    playlist_info_type.innerText = 'PLAYLIST';
    playlist_info_name.innerText = "Liked Songs";
    playlist_author_length.innerText = `${data['playlist_info']['creator']}*${data['music_count']} songs`
    playbtn.classList.add('act_btn_playlist');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)){
    if(innerWidth<700)
        {playlist_info.appendChild(go_back_mobile);}}
    playlist_author_length.setAttribute('id', 'playlist_author_length');
    playlist_info_type.setAttribute('id', 'playlist_info_type');
    playlist_info_name.setAttribute('id', 'playlist_info_name');
    
    playlist_info_authors.setAttribute('id', 'playlist_info_authors')
    act_area.setAttribute('id', 'act_area');
    btn_list.setAttribute('id', 'btn_list');
    playbtn.setAttribute('id', 'playbtn');
    playlist_info.setAttribute('id', 'playlist_info');
    musics_list.setAttribute('id', 'musics_list');
    editbtn_img.setAttribute('src', '/static/base/icons/dots.svg');

    playlist_img_img.setAttribute('src', "/static/base/icons/liked.png")

    playlist_info.setAttribute('id', 'playlist_info');
    info_container.setAttribute('id', 'info_container');
    playlist_img.setAttribute('id', 'playlist_img');
    playlist_info_block.setAttribute('id', 'playlist_info_block');

    btn_list.appendChild(playbtn);
    act_area.appendChild(btn_list);
    playlist_img.appendChild(playlist_img_img);
    playlist_info_block.appendChild(playlist_info_type);
    playlist_info_block.appendChild(playlist_info_name);



    playlist_info_block.appendChild(playlist_author_length);
    playlist_info_block.appendChild(playlist_info_authors);


    info_container.appendChild(playlist_img);
    info_container.appendChild(playlist_info_block);
    playlist_info.appendChild(info_container);

    view_container_content.appendChild(playlist_info);
    view_container_content.appendChild(act_area);


    view_container_content.appendChild(musics_list);
    playbtn.innerHTML = '<i class="fa fa-play-circle fa-5x collection_btn"></i>'
    playbtn.dataset.id = data['playlist_info']['id'];
    playbtn.addEventListener('click', function(){
            music_list = data['musics'];
            loadTrack(track_index);
            playTrack();
    })

    for(let i=0; i <= data['musics'].length ; i++) {
        let music_block = document.createElement('div');
        let likedbtn = document.createElement('div');
        let musindex = document.createElement('div');
        let playmusbtn = document.createElement('div');
        let actionbtn = document.createElement('div');
        let playmusbtn_img = document.createElement('img');
        let thumnail = document.createElement('div');
        let thumnail_img = document.createElement('img');
        let music_info = document.createElement('div');
        let music_name = document.createElement('p');
        let music_author = document.createElement('p');
        let musindexnum = document.createElement('p');
        likedbtn.innerHTML = '<img src="/static/base/icons/heart.svg" alt="">';
        actionbtn.innerHTML = '<img src="/static/base/icons/dots.svg" alt="">'
        playmusbtn_img.setAttribute('src', '/static/base/icons/play-trian.svg');
        thumnail_img.setAttribute('src', data['musics'][i]["thumnail"]);
        music_name.innerText = data['musics'][i]['name'];
        music_author.innerText = data['musics'][i]['artist'];
        musindexnum.innerText = i +1;
        likedbtn.classList.add('liked-btn-block');
        actionbtn.classList.add('actionbtncollection');
        playmusbtn.classList.add('playmusbtn');
        music_name.classList.add('music_name');
        music_author.classList.add('music_author');
        playmusbtn.classList.add('playmusbtn');
        musindexnum.classList.add('musindexnum');
        music_block.classList.add('music_block');
        musindex.classList.add('musindex');
        thumnail.classList.add('thumnail');
        music_info.classList.add('music_info');
        music_info.appendChild(music_name);
        music_info.appendChild(music_author);
        thumnail.appendChild(thumnail_img);
        playmusbtn.appendChild(playmusbtn_img);
        musindex.appendChild(musindexnum);
        musindex.appendChild(playmusbtn);
        music_block.appendChild(musindex);
        music_block.appendChild(thumnail);
        music_block.appendChild(music_info);
        music_block.appendChild(actionbtn);
        musics_list.appendChild(music_block);
        music_name.dataset.id = data['musics'][i]['id']
        music_name.addEventListener('click', async function (){
            window.history.pushState({}, '', `http://${host_address}/track/${data['musics'][i]['id']}`);
            clear_view_content();
            collection_content(`${data['musics'][i]['id']}`, "Track");
        })
        music_author.addEventListener('click', ()=>{
            window.history.pushState({}, '', `http://${host_address}/artist/${data['musics'][i]['artist_id']}`);
            clear_view_content();
            artist_content(data['musics'][i]['artist_id']);
        })
        music_block.appendChild(likedbtn);
        likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
        likedbtn.addEventListener('click', async ()=>{
            likedbtn.remove();
            music_block.remove();
            updateLikedSongs(data['musics'][i]['id'], 'remove')
        });

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)){
            actionbtn.addEventListener('click',  ()=>{
                musicblockactioncontent(data['musics'][i], 'likedsongs', data['playlist_info']['ownership']);
            });
        } else {
            actionbtn.addEventListener('click',  ()=>{
                trackactioncontentpc(data['musics'][i]['id'], music_block, 'likedsongs', data['playlist_info']['ownership']);
            });
        }
        playmusbtn.addEventListener('click', async function() {
            let music = await fetch(`http://${host_address}/get/music/${data['musics'][i]['id']}/info`);
            let datam = await music.json();
            music_list = await datam;

            loadTrack(track_index);
            playTrack();
        });

        };

};

async function collection_content(uni_id, type) {
    try {
        forsearchbar(); }
        catch {
        }
    if (type == "Playlist") {
        var data = await (await fetch(`http://${host_address}/get/playlist/${uni_id}/info`)).json();
    }
    else if (type == "Track") {
        var data = await (await fetch(`http://${host_address}/get/music/${uni_id}/info`)).json();
        var author_block = document.createElement('div');
        var author_img = document.createElement('div');
        var auhtor_info = document.createElement('div');
        var auhtor_info_in = document.createElement('div');
        var author_name = document.createElement('p');
        var author_info_type = document.createElement('p');
        author_block.setAttribute('id', 'author_block');
        author_img.setAttribute('id', 'author_img');
        auhtor_info.setAttribute('id', 'auhtor_info');
        author_name.setAttribute('id', 'author_name');
        author_info_type.setAttribute('id', 'author_info_type');
        author_img.innerHTML = `<img src="${data[0]['authorava']}" alt=""></img>`


        author_info_type.innerText = "ARTIST";
        author_name.innerText = data[0]['artist']
    }

    let playlist_info = document.createElement('div');
    let info_container = document.createElement('div');
    let playlist_img = document.createElement('div');
    let playlist_info_block = document.createElement('div');
    let playlist_img_img = document.createElement('img');
    let playlist_info_type = document.createElement('p');
    let playlist_info_authors = document.createElement('p');
    let playlist_author_length = document.createElement('p');
    let playlist_info_name = document.createElement('h1');
    let editbtn_img = document.createElement('img');
    let likedbtn_img = document.createElement('img');
    let act_area = document.createElement('div');
    let btn_list = document.createElement('div');
    let playbtn = document.createElement('div');
    let likedbtn = document.createElement('div');
    let editbtn = document.createElement('div');
    let musics_list = document.createElement('div');



    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        editbtn.addEventListener('click', function() {
            editbar.classList.add('edit-bar-show');
            editbar.innerHTML = '';
            if(type == 'Track') {
                actioncontent(uni_id, 'Track', data)
            } else if(type=="Playlist") {
                actioncontent(uni_id, 'Playlist', data)
            }
        })
        if(innerWidth<700)
        {playlist_info.appendChild(go_back_mobile);}

    } else {
        editbtn.addEventListener('click', function() {
            if(type == 'Track') {
                actioncontentpc(uni_id, 'Track', data)
            } else if(type=="Playlist") {
                actioncontentpc(uni_id, 'Playlist', data)
            }
        })
    }



    closebtnwd.addEventListener('click', function(){
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
        editbar.innerHTML = '';
    })

    if (type == "Playlist") {
    playlist_info_name.innerText = data["playlist_info"]['name'];
    playlist_info_authors.innerText = data["playlist_info"]['description'];
    playlist_author_length.innerText = `${data['playlist_info']['creator']}*${data['music_count']} songs`
    if(data['playlist_info']['public'] == false) {
        playlist_info_type.innerText = `PRIVATE PLAYLIST`;
        editbtn.dataset.privacy = 'private'
    } else if(data['playlist_info']['public'] == true) {
        playlist_info_type.innerText = `PUBLIC PLAYLIST`;
        editbtn.dataset.privacy = 'public'
    }
    } else if(type == "Track"){
    playlist_info_type.innerText = 'SONG';
    playlist_info_name.innerText = data[0]['name'];
    playlist_info_authors.innerText = 'Roderick Porter, Tame Impala, Yxngrx1 and more';
    }

    playbtn.classList.add('act_btn_playlist');
    likedbtn.classList.add('act_btn_playlist');
    editbtn.classList.add('act_btn_playlist');

    playlist_author_length.setAttribute('id', 'playlist_author_length');
    playlist_info_type.setAttribute('id', 'playlist_info_type');
    playlist_info_name.setAttribute('id', 'playlist_info_name');

    playlist_info_authors.setAttribute('id', 'playlist_info_authors')
    act_area.setAttribute('id', 'act_area');
    btn_list.setAttribute('id', 'btn_list');
    playbtn.setAttribute('id', 'playbtn');
    likedbtn.setAttribute('id', 'likedbtn');
    editbtn.setAttribute('id', 'editbtn');
    playlist_info.setAttribute('id', 'playlist_info');
    musics_list.setAttribute('id', 'musics_list');
    editbtn_img.setAttribute('src', '/static/base/icons/dots.svg');
    likedbtn_img.setAttribute('src', '/static/base/icons/heart.svg');

    if(playlist_info_name.innerText.length > 15) {
        if(innerWidth> 700)
        {playlist_info_name.style.fontSize = '44px'}
    }
    if (type == 'Track') {
    playlist_img_img.setAttribute('src', data[0]['thumnail']);
    if (checkTrack(data[0]['id'])) {
        likedbtn.dataset.liked = 'true';
        likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
        }
    else {
        likedbtn.dataset.liked = 'false';
        likedbtn.style.filter ='invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
    }
    likedbtn.addEventListener('click', async()=>{
        if (checkTrack(data[0]['id'])) {
            likedbtn.dataset.liked = 'false';
            likedbtn.style.filter = 'invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
            updateLikedSongs(data[0]['id'], 'remove');
        } else  {
            likedbtn.dataset.liked = 'true';
            likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
            updateLikedSongs(data[0]['id'], 'add');
        }
    })

    } else if(type == "Playlist") {
        if(data['playlist_info']['ownership'] != 'mine') {
            btn_list.appendChild(likedbtn);
    } else  {
        info_container.addEventListener('click', ()=> {
            if(window.innerWidth > 700){open_edit_details(data['playlist_info']);};
            });
    }
    playlist_img_img.setAttribute('src', data["playlist_info"]['thumnail'])
    if (data['playlist_info']['inLibrary'] == 'yes') {
        likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
        likedbtn.dataset.liked = 'true';
        
        }
    else if(data['playlist_info']['inLibrary'] == 'no') {
        likedbtn.style.filter ='invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
        likedbtn.dataset.liked = 'false';

    }
    likedbtn.addEventListener('click', async()=>{
        if (likedbtn.dataset.liked== 'true') {
            likedbtn.dataset.liked='false';
            likedbtn.style.filter = 'invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
            await fetch(`http://${host_address}/library/remove/playlist/${data['playlist_info']['id']}`);
            actionmessage('Removed from Your Library');
            playlist_list.querySelector(`[data-id='${data['playlist_info']['id']}']`).remove();
        } else if(likedbtn.dataset.liked== 'false') {
            await fetch(`http://${host_address}/library/add/playlist/${data['playlist_info']['id']}`);
            likedbtn.dataset.liked='true';
            addtoplaylist_list(data['playlist_info']);
            likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
            actionmessage('Added to Your Library');

        }
    })
    }


    playlist_info.setAttribute('id', 'playlist_info');
    info_container.setAttribute('id', 'info_container');
    playlist_img.setAttribute('id', 'playlist_img');
    playlist_info_block.setAttribute('id', 'playlist_info_block');

    btn_list.appendChild(playbtn);
    btn_list.appendChild(likedbtn);


    btn_list.appendChild(editbtn);
    act_area.appendChild(btn_list);
    playlist_img.appendChild(playlist_img_img);
    playlist_info_block.appendChild(playlist_info_type);
    playlist_info_block.appendChild(playlist_info_name);
    editbtn.appendChild(editbtn_img);
    likedbtn.appendChild(likedbtn_img);



    playlist_info_block.appendChild(playlist_info_authors);
    playlist_info_block.appendChild(playlist_author_length);

    info_container.appendChild(playlist_img);
    info_container.appendChild(playlist_info_block);
    playlist_info.appendChild(info_container);

    view_container_content.appendChild(playlist_info);
    view_container_content.appendChild(act_area);


    if (type == 'Playlist') {
    
    view_container_content.appendChild(musics_list);
    playbtn.innerHTML = '<i class="fa fa-play-circle fa-5x collection_btn"></i>'
    playbtn.dataset.id = data['playlist_info']['id'];
    playbtn.addEventListener('click', function(){
            music_list = data['musics'];
            loadTrack(track_index);
            playTrack();
    })
    for(let i=0; i <= data['musics'].length; i++) {
        let actionbtn = document.createElement('div');
        let likedbtn = document.createElement('div');
        let music_block = document.createElement('div');
        let musindex = document.createElement('div');
        let playmusbtn = document.createElement('div');
        let playmusbtn_img = document.createElement('img');
        let thumnail = document.createElement('div');
        let thumnail_img = document.createElement('img');
        let music_info = document.createElement('div');
        let music_name = document.createElement('p');
        let music_author = document.createElement('p');
        let musindexnum = document.createElement('p');
        likedbtn.innerHTML = '<img src="/static/base/icons/heart.svg" alt="">';
        actionbtn.innerHTML = '<img src="/static/base/icons/dots.svg" alt="">'
        playmusbtn_img.setAttribute('src', '/static/base/icons/play-trian.svg');
        thumnail_img.setAttribute('src', data['musics'][i]["thumnail"]);
        music_block.dataset.id = data['musics'][i]['id']
        music_name.innerText = data['musics'][i]['name'];
        music_author.innerText = data['musics'][i]['artist'];
        musindexnum.innerText = i +1 ;
        likedbtn.classList.add('liked-btn-block');
        actionbtn.classList.add('actionbtncollection');
        playmusbtn.dataset.id = data['musics'][i]['id'];
        playmusbtn.classList.add('playmusbtn');
        music_name.classList.add('music_name');
        music_author.classList.add('music_author');
        playmusbtn.classList.add('playmusbtn');
        musindexnum.classList.add('musindexnum');
        music_block.classList.add('music_block');
        musindex.classList.add('musindex');
        thumnail.classList.add('thumnail');
        music_info.classList.add('music_info');
        music_info.appendChild(music_name);
        music_info.appendChild(music_author);
        thumnail.appendChild(thumnail_img);
        playmusbtn.appendChild(playmusbtn_img);
        musindex.appendChild(musindexnum);
        musindex.appendChild(playmusbtn);
        music_block.appendChild(musindex);
        music_block.appendChild(thumnail);
        music_block.appendChild(music_info);
        music_block.appendChild(actionbtn);
        musics_list.appendChild(music_block);
        music_name.dataset.id = data['musics'][i]['id'];
        actionbtn.dataset.id = data['musics'][i]['id'];
        if(checkTrack(data['musics'][i]['id'])){
            likedbtn.style.filter = "invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)";
            music_block.dataset.liked = 'true';
            music_block.appendChild(likedbtn);
        }
        likedbtn.addEventListener('click', async ()=>{
            if(music_block.dataset.liked == 'true'){   
                likedbtn.style.filter = 'invert(100%) sepia(59%) saturate(100%) hue-rotate(232deg) brightness(101%) contrast(101%)';
                music_block.dataset.liked = 'false';
                updateLikedSongs(data['musics'][i]['id'], 'remove');
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)){
                likedbtn.remove();
            }
        } else {
            updateLikedSongs(data['musics'][i]['id'], 'add');
            music_block.dataset.liked = 'true';
            likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
        }
        });
        music_author.addEventListener('click', ()=>{
            window.history.pushState({}, '', `http://${host_address}/artist/${data['musics'][i]['artist_id']}`);
            clear_view_content();
            artist_content(data['musics'][i]['artist_id']);
        })
        music_name.addEventListener('click', async function (){
            window.history.pushState({}, '', `http://${host_address}/track/${data['musics'][i]['id']}`);
            clear_view_content();
            collection_content(`${data['musics'][i]['id']}`, "Track");
        })
        playmusbtn.addEventListener('click', function() {
            fetch(`/get/music/${data['musics'][i]['id']}/info`).then(async (music)=>{
                music_list = await music.json();
                loadTrack(track_index);
                playTrack();
            })
        });

        if(innerWidth > 700){
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)){

                
                
                if(music_block.dataset.liked != 'true')
                {
                    likedbtn.style.opacity = '0';
                }
            actionbtn.style.opacity = '0';
            music_block.appendChild(likedbtn);
            music_block.addEventListener('mouseover', ()=>{
            actionbtn.style.opacity = '1';

            likedbtn.style.opacity = '1';
        })
        music_block.addEventListener('mouseleave', ()=>{
            actionbtn.style.opacity = '0';
            if(music_block.dataset.liked != 'true'){
                likedbtn.style.opacity = '0';
            }
        })
            }

    }

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)){
            actionbtn.addEventListener('click',  ()=>{
                musicblockactioncontent(data['musics'][i], uni_id, data['playlist_info']['ownership']);
            });
        } else {
            actionbtn.addEventListener('click',  ()=>{
                trackactioncontentpc(data['musics'][i]['id'], music_block, uni_id, data['playlist_info']['ownership']);
            });
        }


        };
    } else if (type == 'Track') {
        view_container_content.appendChild(author_block);
        author_block.appendChild(author_img);
        author_block.appendChild(auhtor_info);
        auhtor_info.appendChild(auhtor_info_in);
        auhtor_info_in.appendChild(author_info_type);
        auhtor_info_in.appendChild(author_name);
        playbtn.innerHTML = '<i class="fa fa-play-circle fa-5x collection_btn"></i>'
        playbtn.dataset.id = data[0]['id'];
        playbtn.addEventListener('click', function(){
            music_list = data;
            loadTrack(track_index);
            playTrack();
    });
        author_block.addEventListener('click', ()=>{
            clear_view_content();
            artist_content(data[0]['artist_id']);
        })
    }
};
async function artist_content(uni_id) {
    try {
        forsearchbar(); }
        catch {
        }
    var data = await (await fetch(`http://${host_address}/get/artist/${uni_id}/info`)).json();
    let playlist_info = document.createElement('div');
    let info_container = document.createElement('div');
    let playlist_img = document.createElement('div');
    let playlist_info_block = document.createElement('div');
    let playlist_img_img = document.createElement('img');
    let playlist_info_name = document.createElement('h1');
    let editbtn_img = document.createElement('img');
    let act_area = document.createElement('div');
    let btn_list = document.createElement('div');
    let playbtn = document.createElement('div');
    let followbtn = document.createElement('div');
    let editbtn = document.createElement('div');
    let musics_list = document.createElement('div');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)){
        if(innerWidth<700)
            {playlist_info.appendChild(go_back_mobile);}}
    
    playlist_info_block.style = "display:flex;align-items:center;";

    playlist_img_img.style.borderRadius = '50%';
    closebtnwd.addEventListener('click', function(){
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
        editbar.innerHTML = '';
    })
    if(checkArtist(data["artist_info"]['id'])){followbtn.innerHTML ="<p>FOLLOWING</p>"; }
    else{followbtn.innerHTML ="<p>FOLLOW</p>";}

    followbtn.addEventListener('click', async ()=>{
        if(checkArtist(data["artist_info"]['id'])){
            updateArtistList(data["artist_info"]['id'], 'remove');
            followbtn.innerHTML ="<p>FOLLOW</p>";
            
        } else {
            updateArtistList(data["artist_info"]['id'], 'add');
            followbtn.innerHTML ="<p>FOLLOWING</p>"
           
        }
    })

    playlist_info_name.innerText = data["artist_info"]['name'];
    

    playbtn.classList.add('act_btn_playlist');
    editbtn.classList.add('act_btn_playlist');

    playlist_info_name.setAttribute('id', 'playlist_info_name');

    act_area.setAttribute('id', 'act_area');
    btn_list.setAttribute('id', 'btn_list');
    followbtn.setAttribute('id', 'follow-btn');
    playbtn.setAttribute('id', 'playbtn');
    editbtn.setAttribute('id', 'editbtn');
    playlist_info.setAttribute('id', 'playlist_info');
    musics_list.setAttribute('id', 'musics_list');
    editbtn_img.setAttribute('src', '/static/base/icons/dots.svg');

    playlist_img_img.setAttribute('src', data["artist_info"]['thumnail'])
    


    playlist_info.setAttribute('id', 'playlist_info');
    info_container.setAttribute('id', 'info_container');
    playlist_img.setAttribute('id', 'playlist_img');
    playlist_info_block.setAttribute('id', 'playlist_info_block');

    btn_list.appendChild(playbtn);
    btn_list.appendChild(followbtn);
    btn_list.appendChild(editbtn);
    act_area.appendChild(btn_list);
    playlist_img.appendChild(playlist_img_img);
    playlist_info_block.appendChild(playlist_info_name);
    editbtn.appendChild(editbtn_img);


    info_container.appendChild(playlist_img);
    info_container.appendChild(playlist_info_block);
    playlist_info.appendChild(info_container);

    view_container_content.appendChild(playlist_info);
    view_container_content.appendChild(act_area);

    view_container_content.appendChild(musics_list);
    playbtn.innerHTML = '<i class="fa fa-play-circle fa-5x collection_btn"></i>'
    playbtn.dataset.id = data['artist_info']['id'];
    playbtn.addEventListener('click', function(){
            music_list = data['musics'];
            loadTrack(track_index);
            playTrack();
    })
    for(let i=0; i <= data['musics'].length; i++) {
        let actionbtn = document.createElement('div');
        let likedbtn = document.createElement('div');
        let music_block = document.createElement('div');
        let musindex = document.createElement('div');
        let playmusbtn = document.createElement('div');
        let playmusbtn_img = document.createElement('img');
        let thumnail = document.createElement('div');
        let thumnail_img = document.createElement('img');
        let music_info = document.createElement('div');
        let music_name = document.createElement('p');
        let music_author = document.createElement('p');
        let musindexnum = document.createElement('p');
        likedbtn.innerHTML = '<img src="/static/base/icons/heart.svg" alt="">';
        actionbtn.innerHTML = '<img src="/static/base/icons/dots.svg" alt="">'
        playmusbtn_img.setAttribute('src', '/static/base/icons/play-trian.svg');
        thumnail_img.setAttribute('src', data['musics'][i]["thumnail"]);
        music_block.dataset.id = data['musics'][i]['id']
        music_name.innerText = data['musics'][i]['name'];
        music_author.innerText = data['musics'][i]['artist'];
        musindexnum.innerText = i +1 ;
        likedbtn.classList.add('liked-btn-block');
        actionbtn.classList.add('actionbtncollection');
        playmusbtn.dataset.id = data['musics'][i]['id'];
        playmusbtn.classList.add('playmusbtn');
        music_name.classList.add('music_name');
        music_author.classList.add('music_author');
        playmusbtn.classList.add('playmusbtn');
        musindexnum.classList.add('musindexnum');
        music_block.classList.add('music_block');
        musindex.classList.add('musindex');
        thumnail.classList.add('thumnail');
        music_info.classList.add('music_info');
        music_info.appendChild(music_name);
        music_info.appendChild(music_author);
        thumnail.appendChild(thumnail_img);
        playmusbtn.appendChild(playmusbtn_img);
        musindex.appendChild(musindexnum);
        musindex.appendChild(playmusbtn);
        music_block.appendChild(musindex);
        music_block.appendChild(thumnail);
        music_block.appendChild(music_info);
        music_block.appendChild(actionbtn);
        musics_list.appendChild(music_block);
        music_name.dataset.id = data['musics'][i]['id'];
        actionbtn.dataset.id = data['musics'][i]['id'];
        if(checkTrack(data['musics'][i]['id'])){
            likedbtn.style.filter = "invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)";
            music_block.dataset.liked = 'true';
            music_block.appendChild(likedbtn);
        }
        likedbtn.addEventListener('click', async ()=>{
            if(checkTrack(data['musics'][i]['id'])){   
                likedbtn.style.filter = 'invert(100%) sepia(59%) saturate(100%) hue-rotate(232deg) brightness(101%) contrast(101%)';
                updateLikedSongs(data['musics'][i]['id'], 'remove');
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)){
                likedbtn.remove();
            }
            
        } else {
            updateLikedSongs(data['musics'][i]['id'], 'add');
            likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
        }
        });
        music_name.addEventListener('click', async function (){
            window.history.pushState({}, '', `http://${host_address}/track/${data['musics'][i]['id']}`);
            clear_view_content();
            collection_content(`${data['musics'][i]['id']}`, "Track");
        })
        playmusbtn.addEventListener('click', async function() {
            let music = await fetch(`/get/music/${data['musics'][i]['id']}/info`);
            let datam = await music.json();
            music_list = await datam;

            loadTrack(track_index);
            playTrack();
        });

        if(innerWidth > 700){
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)){
                if(!checkTrack(data['musics'][i]['id']))
                {
                    likedbtn.style.opacity = '0';
                }
            actionbtn.style.opacity = '0';
            music_block.appendChild(likedbtn);
            music_block.addEventListener('mouseover', ()=>{
            actionbtn.style.opacity = '1';

            likedbtn.style.opacity = '1';
        })
        music_block.addEventListener('mouseleave', ()=>{
            actionbtn.style.opacity = '0';
            if(!checkTrack(data['musics'][i]['id'])){
                likedbtn.style.opacity = '0';
            }
        })
            }

    }

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)){
            actionbtn.addEventListener('click',  ()=>{
                musicblockactioncontent(data['musics'][i], uni_id, 'NotMine');
            });
        } else {
            actionbtn.addEventListener('click',  ()=>{
                trackactioncontentpc(data['musics'][i]['id'], music_block, uni_id, 'NotMine');
            });
        }


        };
};
async function musicblockactioncontent(data, playlist_id, ownership) {
    let musics_list = view_container_content.querySelector('#musics_list')
    editbar.innerHTML = '';
    editbar.classList.add('edit-bar-show');
    let editbarcontainer = document.createElement('div');
    let edit_container = document.createElement('div');
    let edit_img = document.createElement('div');
    let edit_img_div = document.createElement('div');
    let edit_img_div_img = document.createElement('img');
    let editacts = document.createElement('div');
    let closebtn = document.createElement('div');
    let closebtnwd = document.createElement('p');
    let name_div = document.createElement('div');
    let name_p = document.createElement('p');
    closebtn.setAttribute('id', 'closebtn');
    editacts.setAttribute('id', 'editacts');
    editbarcontainer.setAttribute('id', 'editbarcontainer');
    edit_img.setAttribute('id', 'edit_img');
    edit_container.setAttribute('id', 'edit_container');
    closebtnwd.setAttribute('id', 'closebtnwd');
    name_div.appendChild(name_p);
    name_p.innerText = data['name']
    closebtnwd.innerText = 'Close'
    closebtnwd.addEventListener('click', function(){
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
        })
    closebtn.appendChild(closebtnwd);
    editbar.appendChild(editbarcontainer);
    editbarcontainer.appendChild(edit_container);
    editbar.appendChild(closebtn);

    editbarcontainer.appendChild(editacts);
    edit_container.appendChild(edit_img);
    edit_container.appendChild(name_div);
    edit_img.appendChild(edit_img_div);
    edit_img_div.appendChild(edit_img_div_img);
    edit_img_div_img.setAttribute('src', data['thumnail']);
    let btn_like = document.createElement('div');
    let btn_addtoplaylist = document.createElement('div');
    let btn_removefromplaylist = document.createElement('div');
    let blockcheck = musics_list.querySelector(`[data-id="${data['id']}"]`);
    if(checkTrack(data['id'])){
        btn_like.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/heart.svg' alt=''></div><div><p>Liked</p></div>";
    } else {
        btn_like.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/heart.svg' alt=''></div><div><p>Like</p></div>";
    }
    btn_addtoplaylist.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/add-music.svg' alt=''></div><div><p>Add to playlist</p></div>"
    btn_removefromplaylist.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/minus.svg' alt=''></div><div><p>Remove from this playlist</p></div>"
    btn_addtoplaylist.addEventListener('click', ()=> {
        addtoplaylistcontent(data['id']);
    })
    btn_removefromplaylist.addEventListener('click', ()=>{
        removefromplaylist(data['id'], playlist_id);
        musics_list.querySelector(`[data-id=${data['id']}]`).remove();
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
    })
    btn_like.addEventListener('click', async ()=>{
        if(checkTrack(data['id'])){
            blockcheck.dataset.liked  = 'false';
            updateLikedSongs(data['id'], 'remove');
            blockcheck.querySelector('.liked-btn-block').remove();
        } else {
            blockcheck.dataset.liked  = 'true';
            updateLikedSongs(data['id'], 'add');
            let likedbtn = document.createElement('div');
            likedbtn.innerHTML = '<img src="/static/base/icons/heart.svg" alt="">';
            likedbtn.classList.add('liked-btn-block');
            likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
            blockcheck.appendChild(likedbtn);
            likedbtn.addEventListener('click', async ()=>{
                blockcheck.dataset.liked  = 'false';
                likedbtn.remove();
                updateLikedSongs(data['id'], 'remove');
            });
        }
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
    })


    btn_like.classList.add('editactbtn');
    btn_like.setAttribute('id', 'btn_like');
    btn_addtoplaylist.classList.add('editactbtn');
    btn_addtoplaylist.setAttribute('id', 'btn_addtoplaylist');
    btn_removefromplaylist.classList.add('editactbtn');
    btn_removefromplaylist.setAttribute('id', 'btn_removefromplaylist');
    if(!window.location.href.includes('/collection/tracks'))
    {editacts.appendChild(btn_like);}
    editacts.appendChild(btn_addtoplaylist);
    if(ownership == 'mine')
    {editacts.appendChild(btn_removefromplaylist);}
};

function LibararyPage(){
    let collection_list = document.createElement('div');
    collection_list.classList.add('collection-list');
    let collection_type1 = document.createElement('div');
    let collection_type2 = document.createElement('div');
    let collection_type3 = document.createElement('div');
    collection_type1.innerHTML = '<p>Playlists</p>';
    collection_type2.innerHTML = '<p>Artists</p>';
    collection_type3.innerHTML = '<p>Albums</p>';
    collection_list.appendChild(collection_type1);
    collection_list.appendChild(collection_type2);
    collection_list.appendChild(collection_type3);
    view_container_content.appendChild(collection_list);
    function checktype(){
        if(window.location.href.includes('playlists')) {
            collection_type1.style.backgroundColor = 'rgb(127, 76, 255)';
            collection_type2.style.backgroundColor = 'transparent';
            collection_type3.style.backgroundColor = 'transparent';
            
        } else if(window.location.href.includes('artists')){
            collection_type2.style.backgroundColor = 'rgb(127, 76, 255)';
            collection_type3.style.backgroundColor = 'transparent';
            collection_type1.style.backgroundColor = 'transparent';
        }else if(window.location.href.includes('albums')){
            collection_type3.style.backgroundColor = 'rgb(127, 76, 255)';
            collection_type2.style.backgroundColor = 'transparent';
            collection_type1.style.backgroundColor = 'transparent';
        }
    }
    checktype();
    collection_type1.addEventListener('click', ()=>{
        if(!window.location.href.includes('playlists'))
       { window.history.pushState({}, '', `http://${host_address}/collection/playlists`);
       if(!view_container_content.lastElementChild.classList.contains('collection-list')){
        view_container_content.lastElementChild.remove();
        }
        other_block_content('Playlists');
        checktype();
    }
    })
    collection_type2.addEventListener('click', ()=>{
        if(!window.location.href.includes('artists'))
       { window.history.pushState({}, '', `http://${host_address}/collection/artists`);
       if(!view_container_content.lastElementChild.classList.contains('collection-list')){
        view_container_content.lastElementChild.remove();
        }
        other_block_content('Artists');
         checktype();
    }
    })
    collection_type3.addEventListener('click', ()=>{
        if(!window.location.href.includes('albums'))
        {window.history.pushState({}, '', `http://${host_address}/collection/albums`);
        if(!view_container_content.lastElementChild.classList.contains('collection-list')){
            view_container_content.lastElementChild.remove();
            }
        other_block_content('Albums');
        checktype();
    }
    })
}
async function other_block_content(type){
    try {
        forsearchbar(); }
        catch {}
    if(type == 'Playlists') {
        var data =  await (await fetch(`/get/playlists/info`)).json();
    } else if (type == 'Artists') {
        var data = await (await fetch(`/get/Fartists/info`)).json();
    } else if(type == 'Albums') {
        var data =  await (await fetch(`/get/playlists/info`)).json();
    }
    let container_block = document.createElement('div');
    let section_block = document.createElement('div');
    let cre_play_tbn = document.createElement('div');
    cre_play_tbn.classList.add('cre-play-tbn');
    cre_play_tbn.innerHTML = '<img src="/static/base/icons/plus.svg" alt="">'
    container_block.classList.add('container_block');
    container_block.classList.add('container_block_collection');
    section_block.classList.add('section_block');
    section_block.classList.add('section_block_library');
    container_block.appendChild(section_block);
    cre_play_tbn.addEventListener('click', ()=>{
    });
    cre_play_tbn.addEventListener('click', ()=>{
                createplaylist2();
      });
    if(type == 'Playlists') {
    let block_info = document.createElement('div');
    let name_playlist_block = document.createElement('div');
    let img_container_block_other = document.createElement('div');
    let img_container_block_other_img = document.createElement('img');
    let other_block_btn = document.createElement('div')
    let bla_bla = document.createElement('div');
    let bla_bla_p = document.createElement('p');
    other_block_btn.innerHTML = '<i class="fa fa-play-circle fa-5x playbtn_block_icon"></i>';
    bla_bla_p.innerText = "Liked Songs";
    img_container_block_other_img.setAttribute('src', '/static/base/icons/liked.png');
    block_info.classList.add('block_info');
    name_playlist_block.classList.add('name_playlist_block');
    img_container_block_other.classList.add('img_container_block_other');
    img_container_block_other_img.classList.add('img_container_block_other');
    other_block_btn.classList.add('other_block_btn');
    bla_bla.classList.add('bla_bla');
    bla_bla.appendChild(bla_bla_p);
    section_block.appendChild(name_playlist_block);
    name_playlist_block.appendChild(block_info);
    block_info.appendChild(img_container_block_other);
    block_info.appendChild(bla_bla);
    img_container_block_other.appendChild(img_container_block_other_img);
    img_container_block_other.appendChild(other_block_btn);
    name_playlist_block.addEventListener('click', async function(){
            window.history.pushState({}, '', `http://${host_address}/collection/tracks`);
            clear_view_content();
            collection_likedsongs()
        });
    }

    for(var i = 0; i < data.length; i++) {
    let block_info = document.createElement('div');
    let name_playlist_block = document.createElement('div');
    let img_container_block_other = document.createElement('div');
    let img_container_block_other_img = document.createElement('img');
    let other_block_btn = document.createElement('div')
    let bla_bla = document.createElement('div');
    let bla_bla_p = document.createElement('p');
    other_block_btn.innerHTML = '<i class="fa fa-play-circle fa-5x playbtn_block_icon"></i>';
    bla_bla_p.innerText = data[i]['name'];

    img_container_block_other_img.setAttribute('src', data[i]['thumnail']);
    if(type == 'Artists') {
        img_container_block_other_img.style.borderRadius = '50%';
        bla_bla_p.style.fontSize = '18px';
    } 
    other_block_btn.dataset.id = data[i]['id'];
    block_info.classList.add('block_info');
    name_playlist_block.classList.add('name_playlist_block');
    name_playlist_block.dataset.id = data[i]['id'];
    img_container_block_other.classList.add('img_container_block_other');
    img_container_block_other_img.classList.add('img_container_block_other');
    other_block_btn.classList.add('other_block_btn');
    bla_bla.classList.add('bla_bla');
    bla_bla.appendChild(bla_bla_p);
    section_block.appendChild(name_playlist_block);
    name_playlist_block.appendChild(block_info);
    block_info.appendChild(img_container_block_other);
    block_info.appendChild(bla_bla);
    img_container_block_other.appendChild(img_container_block_other_img);
    img_container_block_other.appendChild(other_block_btn);
    other_block_btn.addEventListener('click', async function() {
        let playlist_data = await fetch(`/get/playlist/${this.dataset.id}/info`);
        let data = await playlist_data.json();
        music_list = data['musics'];
        loadTrack(track_index);
        playTrack();
    });
    name_playlist_block.addEventListener('click', async function(){
            clear_view_content();
            if(type == 'Playlists') {
                window.history.pushState({}, '', `http://${host_address}/playlist/${this.dataset.id}`);
                collection_content(this.dataset.id, "Playlist");
            } else if (type== 'Artists') {
                window.history.pushState({}, '', `http://${host_address}/artist/${this.dataset.id}`);
                artist_content(this.dataset.id);
            } else if(type=='Albums') {
                window.history.pushState({}, '', `http://${host_address}/playlist/${this.dataset.id}`);
                collection_content(this.dataset.id, "Playlist");
            }
        });
}
if(window.innerWidth < 700) {
    view_container_content.appendChild(cre_play_tbn);
    }
view_container_content.appendChild(container_block);
};
function searchpage(){
    clear_view_content();
    let search_bar = document.createElement('div');
    search_bar.classList.add('search-bar');
    let list_types = document.createElement('div');
    list_types.classList.add('list-types');
    let type_btn1 = document.createElement('div');
    type_btn1.classList.add('type-btn');
    let type_btn2 = document.createElement('div');
    type_btn2.classList.add('type-btn');
    let type_btn3 = document.createElement('div');
    type_btn3.classList.add('type-btn');
    type_btn1.innerHTML = '<p>Songs</p>';
    type_btn2.innerHTML = '<p>Playlists</p>';
    type_btn3.innerHTML = '<p>Artists</p>';
    let search_list = document.createElement('div');
    search_list.classList.add('search_list');
    search_list.classList.add('song_list');
    view_container_content.appendChild(search_bar);
    view_container_content.appendChild(list_types);
    view_container_content.appendChild(search_list);
    list_types.appendChild(type_btn1);
    list_types.appendChild(type_btn2);
    list_types.appendChild(type_btn3);
};


async function search_result(data, type){
    let search_list = document.querySelector('.search_list');
    search_list.innerHTML = '';
    for(let i = 0; i < data[type].length; i++) {
    let music_block = document.createElement('div');
    music_block.classList.add('music_block');
    let thumnail  = document.createElement('div');
    thumnail.classList.add('thumnail');
    let thumnail_img = document.createElement('img');
    thumnail_img.src = data[type][i]['thumnail'];
    let music_info = document.createElement('div');
    let music_name = document.createElement('p');
    let music_author = document.createElement('p');
    music_name.innerText = data[type][i]['name'];
    if(type== 'songs') 
    {music_author.innerText = "Song"; }
    else if(type == 'playlists')
    {music_author.innerText = "Playlist"; }
    else if(type == 'artists')
    {music_author.innerText = "Artist"; }

    music_info.classList.add('music_info');
    music_name.classList.add('music_name');
    music_author.classList.add('music_author');
    music_author.classList.add('search_name');
    music_author.classList.add('search_author');
    music_block.appendChild(thumnail);
    music_block.appendChild(music_info);
    thumnail.appendChild(thumnail_img);
    music_info.appendChild(music_name);
    music_info.appendChild(music_author);
    search_list.appendChild(music_block);
    music_block.dataset.id = data[type][i]['id'];
    music_block.addEventListener('click', async function (){
        clear_view_content();
        if(type == 'songs') {
        window.history.pushState({}, '', `http://${host_address}/track/${this.dataset.id}`);
        collection_content(`${this.dataset.id}`, "Track"); }
        else if (type == 'playlists') {
        window.history.pushState({}, '', `http://${host_address}/playlist/${this.dataset.id}`);
        collection_content(`${this.dataset.id}`, "Playlist"); 
        } else if(type == 'artists') {
        window.history.pushState({}, '', `http://${host_address}/artist/${this.dataset.id}`);
        artist_content(`${this.dataset.id}`); 
        }
    })
    }
}


let type = 'songs'
function AcivateSearch() {
    var idleTime = 0;
    let types = document.querySelectorAll('.type-btn');
    searchinput.addEventListener('keyup', async function(){
        window.history.replaceState({}, '', `http://${host_address}/search/${this.value}`);
        idleTime = 0;
        if(this.value != "") {
            var get_data = await (await fetch(`/betasearch/${this.value}`)).json();
        }
        search_result(get_data, type);
        types[0].addEventListener('click', ()=> {
            search_result(get_data, 'songs');
            type = 'songs';
            types[0].style.color = 'white'
            types[1].style.color = 'black'
            types[2].style.color = 'black'
            types[0].style.backgroundColor = '#8758FF'
            types[1].style.backgroundColor = 'white'
            types[2].style.backgroundColor = 'white'

        })
        types[1].addEventListener('click', ()=> {
            search_result(get_data, 'playlists');
            type = 'playlists';
            types[0].style.color = 'black'
            types[1].style.color = 'white'
            types[2].style.color = 'black'
            types[0].style.backgroundColor = 'white'
            types[1].style.backgroundColor = '#8758FF'
            types[2].style.backgroundColor = 'white'

        })
        types[2].addEventListener('click', ()=> {
            search_result(get_data, 'artists');
            type = 'artists';
            types[0].style.color = 'black'
            types[1].style.color = 'black'
            types[2].style.color = 'white'
            types[0].style.backgroundColor = 'white'
            types[1].style.backgroundColor = 'white'
            types[2].style.backgroundColor = '#8758FF'
        })
    })
}


// =================================Sub functions editcontent, players =========================
async function delete_playlist(playlist_id) {
    let action = await fetch(`/delete/playlist/${playlist_id}`);
    actionmessage('Removed from Your Libarary');
}
async function addtoplaylistcontent(track_id) {
    let data = await (await fetch(`http://${host_address}/get/playlists/info`)).json();
    let ReactModalPortal = document.createElement('div');
    ReactModalPortal.classList.add('ReactModalPortal');
    ReactModalPortal.style.top = '300%';
    main.appendChild(ReactModalPortal);
    sleep(100).then(()=>{
        ReactModalPortal.style.top='0';
    })
    let addcontent = document.createElement('div');
    let action_detail = document.createElement('div');
    let cancel_btn_add = document.createElement('div');
    let playlistslist = document.createElement('div');
    addcontent.classList.add('addcontent');
    action_detail.classList.add('action_detail');
    cancel_btn_add.classList.add('cancel-btn-add');
    playlistslist.classList.add('playlistslist');

    action_detail.innerHTML = '<p>Add to Playlist</p>';
    cancel_btn_add.innerHTML = '<p>Cancel</p>';
    addcontent.appendChild(action_detail);
    addcontent.appendChild(cancel_btn_add);
    addcontent.appendChild(playlistslist);

    for(let i = 0; i <  data.length; i++) {
        if(data[i]['username'] == data[i]['creator']) {
        let playlist_block = document.createElement('div');
        let playlist_block_add_img = document.createElement('div');
        let playlist_block_add_info = document.createElement('div');
        playlist_block.classList.add('playlist-block');
        playlist_block_add_img.classList.add('playlist-block-add-img');
        playlist_block_add_info.classList.add('playlist-block-add-info');
        playlist_block_add_img.innerHTML =  `<img src="${data[i]['thumnail']}" alt=""></img>`
        playlist_block_add_info.innerHTML = `<div class="playlist-block-name"><p>${data[i]['name']}</p></div><div class="playlist-block-details"><p>By ${data[i]['creator']}</p></div>`;
        playlist_block.appendChild(playlist_block_add_img);
        playlist_block.appendChild(playlist_block_add_info);
        playlistslist.appendChild(playlist_block);
        playlist_block.addEventListener('click', async ()=>{
            let addto = await fetch(`http://${host_address}/add/track/${track_id}/playlist/${data[i]['id']}`)
            actionmessage('Added to Playlist');
            ReactModalPortal.remove();
            editbar.classList.remove('edit-bar-show');
            editbar.classList.add('edit-bar-hidden');
        })}
    }
    ReactModalPortal.appendChild(addcontent);
    cancel_btn_add.addEventListener('click', ()=>{
        ReactModalPortal.style.top = '300%';
        sleep(100).then(()=>{
            ReactModalPortal.remove();
        })
    })
}
async function removefromplaylist(track_id, playlist_id) {
    await fetch(`http://${host_address}/remove/track/${track_id}/playlist/${playlist_id}`)
    actionmessage('Removed from Playlist');
    editbar.classList.remove('edit-bar-show');
    editbar.classList.add('edit-bar-hidden');
}
async function actioncontent(uni_id, type, data_info) {
    let likedbtn = document.getElementById('likedbtn');
    if(type == "Track") {
        var data = data_info[0]}
    else if(type=='Playlist') {
        var data = data_info['playlist_info'];
    }
    let editbarcontainer = document.createElement('div');
    let edit_container = document.createElement('div');
    let edit_img = document.createElement('div');
    let edit_img_div = document.createElement('div');
    let edit_img_div_img = document.createElement('img');
    let editacts = document.createElement('div');
    let closebtn = document.createElement('div');
    let closebtnwd = document.createElement('p');
    let name_div = document.createElement('div');
    let name_p = document.createElement('p');
    closebtn.setAttribute('id', 'closebtn');
    editacts.setAttribute('id', 'editacts');
    editbarcontainer.setAttribute('id', 'editbarcontainer');
    edit_img.setAttribute('id', 'edit_img');
    edit_container.setAttribute('id', 'edit_container');
    closebtnwd.setAttribute('id', 'closebtnwd');
    name_div.appendChild(name_p);
    name_p.innerText = data['name']
    closebtnwd.innerText = 'Close'
    closebtnwd.addEventListener('click', function(){
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
        })
    closebtn.appendChild(closebtnwd);
    editbar.appendChild(editbarcontainer);
    editbarcontainer.appendChild(edit_container);
    editbar.appendChild(closebtn);

    editbarcontainer.appendChild(editacts);
    edit_container.appendChild(edit_img);
    edit_container.appendChild(name_div);
    edit_img.appendChild(edit_img_div);
    edit_img_div.appendChild(edit_img_div_img);
    edit_img_div_img.setAttribute('src', data['thumnail']);





    if(type == 'Playlist') { 
    if(data['ownership'] == 'mine') {
    let btn_addsongs = document.createElement('div');
    let btn_edit = document.createElement('div');
    let btn_makeprivate = document.createElement('div');
    let btn_removefromprofile = document.createElement('div');
    let btn_deleteplaylist = document.createElement('div');
    btn_addsongs.classList.add('editactbtn');
    btn_addsongs.setAttribute('id', 'btn_addsongs');
    btn_edit.classList.add('editactbtn');
    btn_edit.setAttribute('id', 'btn_edit');
    btn_makeprivate.classList.add('editactbtn');
    btn_makeprivate.setAttribute('id', 'btn_makeprivate');
    btn_removefromprofile.classList.add('editactbtn');
    btn_removefromprofile.setAttribute('id', 'btn_removefromprofile');
    btn_deleteplaylist.classList.add('editactbtn');
    btn_deleteplaylist.setAttribute('id', 'btn_deleteplaylist');
    btn_addsongs.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/plus.svg' alt=''></div><div><p>Add songs</p></div>"
    btn_edit.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/pen.svg' alt=''></div><div><p>Edit</p></div>"

    if(data['public'] == false) {
    btn_makeprivate.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/lock.svg' alt=''></div><div><p>Make Public</p></div>"
    btn_makeprivate.addEventListener('click', async ()=>{
        await fetch(`http://${host_address}/playlist/${data['id']}/make/public`)
        actionmessage('Playlist has been made public');
    })
    } else if(data['public'] == true) {
    btn_makeprivate.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/lock.svg' alt=''></div><div><p>Make Private</p></div>"
    btn_makeprivate.addEventListener('click', async ()=>{
        await fetch(`http://${host_address}/playlist/${data['id']}/make/private`)
        actionmessage('Playlist has been made private');

    })
    }
    btn_removefromprofile.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/profile.svg' alt=''></div><div><p>Remove from profile</p></div>"
    btn_deleteplaylist.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/minus.svg' alt=''></div><div><p>Delete Playlist</p></div>"
    editacts.appendChild(btn_addsongs);
    editacts.appendChild(btn_edit);
    editacts.appendChild(btn_makeprivate);
    editacts.appendChild(btn_removefromprofile);
    editacts.appendChild(btn_deleteplaylist);

    btn_makeprivate.addEventListener('click', ()=> {
        editbar.classList.remove('edit-bar-show');
            editbar.classList.add('edit-bar-hidden');
    })

    
    btn_edit.addEventListener('click', ()=> {
        open_edit_details(data);
    });
    btn_deleteplaylist.addEventListener('click', ()=> {
        delete_playlist(data['id']);  
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
        window.history.replaceState({}, '', `http://${host_address}/collection/playlists`);
        playlist_list.querySelector(`[data-id="${data['id']}"]`).remove();
        clear_view_content();
        LibararyPage()
        other_block_content('Playlists');;
    });
    } else {
        if (data['inLibrary'] == 'no') {
        let btn_addtolibrary = document.createElement('div');
        btn_addtolibrary.classList.add('editactbtn');
        btn_addtolibrary.setAttribute('id', 'btn_addtolibrary');
        btn_addtolibrary.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/plus.svg' alt=''></div><div><p>Add to library</p></div>"
        editacts.appendChild(btn_addtolibrary);
        btn_addtolibrary.addEventListener('click', async ()=>{
            let addtolibrary = await fetch(`http://${host_address}/library/add/playlist/${data['id']}`)
            actionmessage('Added to Your Library');
            editbar.classList.remove('edit-bar-show');
            editbar.classList.add('edit-bar-hidden');
        }) 
    }
        else if(data['inLibrary'] == 'yes') {
            let btn_removefromlibrary = document.createElement('div');
            btn_removefromlibrary.classList.add('editactbtn');
            btn_removefromlibrary.setAttribute('id', 'btn_removefromlibrary');
            btn_removefromlibrary.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/minus.svg' alt=''></div><div><p>Remove from My Library</p></div>"
            editacts.appendChild(btn_removefromlibrary);
            btn_removefromlibrary.addEventListener('click', async ()=>{
                let removefromlibrary = await fetch(`http://${host_address}/library/remove/playlist/${data['id']}`);
                actionmessage('Removed from Your Library');
                editbar.classList.remove('edit-bar-show');
                editbar.classList.add('edit-bar-hidden');
            }) 
        }
    }
    } else if(type == 'Track') {
        let btn_like = document.createElement('div');
        let btn_addtoplaylist = document.createElement('div');

        if(checkTrack(data['id'])) {
            btn_like.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/heart.svg' alt=''></div><div><p>Liked</p></div>";
        } else {
            btn_like.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/heart.svg' alt=''></div><div><p>Like</p></div>";
        }

        btn_like.addEventListener('click', async ()=>{
            if(checkTrack(data['id'])) {
                likedbtn.dataset.liked = 'false';
                likedbtn.style.filter = "invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)";
                updateLikedSongs(data['id'], 'remove');
            } else {
                likedbtn.dataset.liked = 'true';
                likedbtn.style.filter = "invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)";
                updateLikedSongs(data['id'], 'add');
            }
            editbar.classList.remove('edit-bar-show');
            editbar.classList.add('edit-bar-hidden');

        })
        btn_addtoplaylist.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/add-music.svg' alt=''></div><div><p>Add to playlist</p></div>";
        btn_addtoplaylist.addEventListener('click', ()=> {
            addtoplaylistcontent(data['id']);
        })
        btn_like.classList.add('editactbtn');
        btn_like.setAttribute('id', 'btn_like');
        btn_addtoplaylist.classList.add('editactbtn');
        btn_addtoplaylist.setAttribute('id', 'btn_addtoplaylist');
        editacts.appendChild(btn_like);
        editacts.appendChild(btn_addtoplaylist);
    }
}
async function actioncontentpc(uni_id, type, data_info){
    let likedbtn = document.getElementById('likedbtn');
    let editbtn = document.getElementById('editbtn');
    let playlist_info_type = document.getElementById('playlist_info_type');
    if(type == "Track") {
        var data = data_info[0]}
    else if(type=='Playlist') {
        var data = data_info['playlist_info'];
    }
    let editbarcontainer = document.createElement('div');
    let editacts = document.createElement('div');
    editacts.setAttribute('id', 'editactspc');
    editbarcontainer.setAttribute('id', 'editbarcontainpc');
    editbarcontainer.appendChild(editacts);

    if(type == 'Playlist') { 
    if(data['ownership'] == 'mine') {
    let btn_addsongs = document.createElement('div');
    let btn_makeprivate = document.createElement('div');
    let btn_removefromprofile = document.createElement('div');
    let btn_deleteplaylist = document.createElement('div');
    btn_addsongs.classList.add('editactbtnpc');
    btn_addsongs.setAttribute('id', 'btn_addsongs');
    btn_makeprivate.classList.add('editactbtnpc');
    btn_makeprivate.setAttribute('id', 'btn_makeprivate');
    btn_removefromprofile.classList.add('editactbtnpc');
    btn_removefromprofile.setAttribute('id', 'btn_removefromprofile');
    btn_deleteplaylist.classList.add('editactbtnpc');
    btn_deleteplaylist.setAttribute('id', 'btn_deleteplaylist');
    btn_addsongs.innerHTML = "<div><p>Add songs</p></div>"

    if(editbtn.dataset.privacy == 'private') {
    btn_makeprivate.innerHTML = "<div><p>Make public</p></div>"
      }
    else {
        btn_makeprivate.innerHTML = '<div><p>Make private</p></div>'
    }
    btn_makeprivate.addEventListener('click', async ()=>{
        if(editbtn.dataset.privacy == 'private') {
            editbtn.dataset.privacy = 'public'
            playlist_info_type.innerText = "PUBLIC PLAYLIST"
        await fetch(`http://${host_address}/playlist/${data['id']}/make/public`);
        actionmessage('Playlist has been made public');
    }
        else {
            editbtn.dataset.privacy = 'private'
            playlist_info_type.innerText = "PRIVATE PLAYLIST"
           await fetch(`http://${host_address}/playlist/${data['id']}/make/private`);
            actionmessage('Playlist has been made private');

        }
    })
    btn_removefromprofile.innerHTML = "<div><p>Remove from profile</p></div>"
    btn_deleteplaylist.innerHTML = "<div><p>Delete Playlist</p></div>"
    editacts.appendChild(btn_addsongs);
    editacts.appendChild(btn_makeprivate);
    editacts.appendChild(btn_removefromprofile);
    editacts.appendChild(btn_deleteplaylist);
    btn_deleteplaylist.addEventListener('click', ()=> {
        delete_playlist(data['id']);
        window.history.replaceState({}, '', `http://${host_address}/collection/playlists`);
        clear_view_content();
        LibararyPage()
        other_block_content('Playlists');
        playlist_list.querySelector(`[data-id="${data['id']}"]`).remove();
    });
    } else {
        let btn_removefromlibrary = document.createElement('div');
        btn_removefromlibrary.classList.add('editactbtnpc');
        btn_removefromlibrary.setAttribute('id', 'btn_removefromlibrary');
        if(likedbtn.dataset.liked == 'true'){
            btn_removefromlibrary.innerHTML = '<div><p>Remove from My library</p></div>';
        } else {
            btn_removefromlibrary.innerHTML = '<div><p>Added to My library</p></div>';
        }
        btn_removefromlibrary.addEventListener('click', async ()=>{
            if(likedbtn.dataset.liked == 'true'){
                likedbtn.style.filter = 'invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
                await fetch(`http://${host_address}/library/remove/playlist/${data['id']}`);
                likedbtn.dataset.liked = 'false';
                actionmessage('Removed from Your Library');
            } else {
                likedbtn.dataset.liked = 'true';
                
                await fetch(`http://${host_address}/library/add/playlist/${data['id']}`);
                likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
                actionmessage('Added to Your Library');
            } 
        })
        editacts.appendChild(btn_removefromlibrary);
    }
    } else if(type == 'Track') {
        let btn_like = document.createElement('div');
        let btn_addtoplaylist = document.createElement('div');


        if(likedbtn.dataset.liked == 'true') {
            btn_like.innerHTML = "<div><p>Liked</p></div>";
        } else {
            btn_like.innerHTML = "<div><p>Like</p></div>";
        }

        btn_like.addEventListener('click', async ()=>{
            if(checkTrack(data['id'])) {
                btn_like.innerHTML = "<div><p>Like</p></div>";
                likedbtn.dataset.liked = 'false';
                likedbtn.style.filter = "invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)";
                updateLikedSongs(data['id'], 'remove');
            } else {
                likedbtn.dataset.liked = 'true';
                btn_like.innerHTML = "<div><p>Liked</p></div>";
                likedbtn.style.filter = "invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)";
                updateLikedSongs(data['id'], 'add');
            }
            editbar.classList.remove('edit-bar-show');
            editbar.classList.add('edit-bar-hidden');

        })
        btn_addtoplaylist.innerHTML = "<div><p>Add to playlist</p></div>";
        btn_like.classList.add('editactbtnpc');
        btn_like.setAttribute('id', 'btn_like');
        btn_addtoplaylist.classList.add('editactbtnpc');
        btn_addtoplaylist.setAttribute('id', 'btn_addtoplaylist');
        editacts.appendChild(btn_like);
        editacts.appendChild(btn_addtoplaylist);
        btn_addtoplaylist.addEventListener('mouseover', ()=>{
           addtoplaylistpc(data['id']);
        })
        btn_like.addEventListener('mouseover', ()=>{
            btn_addtoplaylist.innerHTML = "<div><p>Add to playlist</p></div>";
        })
    }
    if(editbtn.childElementCount == 1) {
        editbtn.appendChild(editbarcontainer);
    } else {
        document.getElementById('editbarcontainpc').remove();
    }
}
async function trackactioncontentpc(uni_id, block, playlist_id, ownership){
    let likedbtn = block.querySelector('.liked-btn-block')
    let actionbutton = block.querySelector('.actionbtncollection');
    let editbarcontainer = document.createElement('div');
    let editacts = document.createElement('div');
    editacts.setAttribute('id', 'editactspc');
    editbarcontainer.setAttribute('id', 'editbarcontainpc');
    editbarcontainer.appendChild(editacts);
    editbarcontainer.style.left='0';
    editbarcontainer.style.transform = 'translate(-100%, 50%)';
    let btn_like = document.createElement('div');
    let btn_addtoplaylist = document.createElement('div');
    let btn_removefromplaylist = document.createElement('div');
    if(checkTrack(uni_id)){
        btn_like.innerHTML = "<div><p>Liked</p></div>";
    } else {
        btn_like.innerHTML = "<div><p>Like</p></div>";
    }

    btn_like.addEventListener('click', async ()=>{
        if(checkTrack(uni_id)){
            block.dataset.liked = 'false';
            updateLikedSongs(uni_id, 'remove');
            likedbtn.style.filter = "invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)";
        } else {
            block.dataset.liked = 'true';
            updateLikedSongs(uni_id, 'add');
            likedbtn.style.filter = "invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)";
        }
    });
    btn_addtoplaylist.innerHTML = "<div><p>Add to playlist</p></div>";
    btn_removefromplaylist.innerHTML = "<div><p>Remove from this playlist</p></div>";
    btn_like.classList.add('editactbtnpc');
    btn_like.setAttribute('id', 'btn_like');
    btn_addtoplaylist.classList.add('editactbtnpc');
    btn_addtoplaylist.setAttribute('id', 'btn_addtoplaylist');
    btn_removefromplaylist.classList.add('editactbtnpc');
    btn_removefromplaylist.setAttribute('id', 'btn_removefromplaylist')
    editacts.appendChild(btn_like);
    editacts.appendChild(btn_addtoplaylist);
    if(ownership =='mine'){editacts.appendChild(btn_removefromplaylist);}
    btn_addtoplaylist.addEventListener('mouseover', ()=>{
        addtoplaylistpc_trackblock(uni_id, btn_addtoplaylist);
    })
    btn_like.addEventListener('mouseover', ()=>{
        btn_addtoplaylist.innerHTML = "<div><p>Add to playlist</p></div>";
    })
    btn_removefromplaylist.addEventListener('mouseover', ()=>{
        btn_addtoplaylist.innerHTML = "<div><p>Add to playlist</p></div>";
    })
    btn_removefromplaylist.addEventListener('click', async ()=>{
        document.getElementById('musics_list').querySelector(`[data-id=${uni_id}]`).remove();
        await fetch(`http://${host_address}/remove/track/${uni_id}/playlist/${playlist_id}`);
        actionmessage('Removed from Playlist');
    })
    if(actionbutton.childElementCount == 1) {
        actionbutton.appendChild(editbarcontainer);
    } else {
        actionbutton.querySelector('#editbarcontainpc').remove();
    }
}
async function addtoplaylistpc(track_id){
    if(btn_addtoplaylist.childElementCount == 1)
    {
    let editbtn = document.getElementById('editbtn');
    let btn_addtoplaylist = editbtn.querySelector('#btn_addtoplaylist');
    let data = await (await fetch(`http://${host_address}/get/playlists/info`)).json();

    let addcontent = document.createElement('div');

    let playlistslist = document.createElement('div');
    addcontent.classList.add('addcontentpc');
    playlistslist.classList.add('playlistslistpc');

    addcontent.appendChild(playlistslist);

    for(let i = 0; i <  data.length; i++) {
        if(data[i]['username'] == data[i]['creator']) {
        let playlist_block = document.createElement('div');
        playlist_block.classList.add('editactbtnpc');
        playlist_block.innerHTML = `<div><p>${data[i]['name']}</p></div>`;
        playlistslist.appendChild(playlist_block);
        playlist_block.addEventListener('click', async ()=>{
            let addto = await fetch(`http://${host_address}/add/track/${track_id}/playlist/${data[i]['id']}`)
            actionmessage("Added to Playlist")
        })
    }
    }
    btn_addtoplaylist.appendChild(addcontent);
}
}
async function addtoplaylistpc_trackblock(track_id, block){
    if(block.childElementCount == 1)
    {
    let editbtn = document.getElementById('editbtn');
    let data = await (await fetch(`http://${host_address}/get/playlists/info`)).json();

    let addcontent = document.createElement('div');
    let playlistslist = document.createElement('div');
    addcontent.classList.add('addcontentpc');
    addcontent.style.left = '0';
    addcontent.style.transform = 'translate(-100%, -50%)'
    playlistslist.classList.add('playlistslistpc');

    addcontent.appendChild(playlistslist);

    for(let i = 0; i <  data.length; i++) {
        if(data[i]['username'] == data[i]['creator']) {
        let playlist_block = document.createElement('div');
        playlist_block.classList.add('editactbtnpc');
        playlist_block.innerHTML = `<div><p>${data[i]['name']}</p></div>`;
        playlistslist.appendChild(playlist_block);
        playlist_block.addEventListener('click', async ()=>{
            let addto = await fetch(`http://${host_address}/add/track/${track_id}/playlist/${data[i]['id']}`)
            actionmessage('Added to Playlist');
        })
    }
    }
    block.appendChild(addcontent);
}
}
async function open_edit_details(data) {
    let ReactModalPortal = document.createElement('div');
    ReactModalPortal.classList.add('ReactModalPortal');
    let outform = document.createElement('div');
    outform.classList.add('outform');
    main.appendChild(ReactModalPortal);
    let form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('enctype', 'multipart/form-data');
    form.setAttribute('id', 'editform');
    let submit_area = document.createElement('div');
    submit_area.classList.add('submit-area');
    submit_area.innerHTML = '<div class="save-btn"><p>Save</p></div>';
    let playlist_edit_pop_up = document.createElement('div');
    playlist_edit_pop_up.classList.add('playlist-edit-pop-up');
    let pop_up_up = document.createElement('div');
    pop_up_up.classList.add('pop-up-up'); 
    pop_up_up.innerHTML = "<div class='action-name'><h1>Edit details</h1></div><div class='cancel-btn'><img src='/static/base/icons/cancel.svg' alt=''></div>"
    let pop_up_middle = document.createElement('div');
    pop_up_middle.classList.add('pop-up-middle'); 
    let img_container_pop = document.createElement('div');
    img_container_pop.classList.add('img-container-pop');
    img_container_pop.innerHTML = `<img src="${data['thumnail']}" alt="" id="img_place"><input type="file" class="file-input" name="thumnail" accept="image/.jpg, image/.jpeg, image/.png" id="image_upload">`
    let playlist_edit_inputs = document.createElement('div');
    playlist_edit_inputs.classList.add('playlist-edit-inputs');
    playlist_edit_inputs.innerHTML = `<div class="playlist-edit-name-input"><input type="text" placeholder="Name here" autocomplete="none" name="name" id="input_name" maxlength="30"></div><div class="playlist-edit-description-input"><textarea name="descriptiontoplaylist" id="" cols="30" rows="10" placeholder="Add an optional description.." name="description">${data['description']}</textarea></div>`


    pop_up_middle.appendChild(img_container_pop);
    pop_up_middle.appendChild(playlist_edit_inputs);
    ReactModalPortal.appendChild(form);
    ReactModalPortal.appendChild(outform);
    form.appendChild(playlist_edit_pop_up);
    playlist_edit_pop_up.appendChild(pop_up_up);
    playlist_edit_pop_up.appendChild(pop_up_middle);
    playlist_edit_pop_up.appendChild(submit_area);

    let image_preview = document.getElementById('img_place');
    let cancel_btn = document.querySelector('.cancel-btn');
    let image_upload = document.getElementById('image_upload');
    let savebtn = document.querySelector('.save-btn');
    img_container_pop.addEventListener('click', ()=> {
        image_upload.click();
        image_upload.addEventListener('change', function (event){
            if(event.target.files.length > 0){
              var src = URL.createObjectURL(event.target.files[0]);
              image_preview.setAttribute('src', src)
            }
          })
    })
    let input_name = document.getElementById('input_name');
    input_name.value = data['name'];
    outform.addEventListener('click', function(){
        ReactModalPortal.remove();
    })
    cancel_btn.addEventListener('click', ()=> {
        ReactModalPortal.remove();
    })
   


    savebtn.addEventListener('click', () => {
        form.submit();
        clear_view_content();
        collection_content(location.substring(location.lastIndexOf('/') +1), 'Playlist');
    }
)

}
async function createplaylist2(){
    let ReactModalPortal = document.createElement('div');
    ReactModalPortal.classList.add('ReactModalPortal');
    ReactModalPortal.style.top = '300%';
    main.appendChild(ReactModalPortal);
    sleep(100).then(()=>{
        ReactModalPortal.style.top = '0';
    })
    let creplaylistcontent = document.createElement('div');
    creplaylistcontent.classList.add('creplaylistcontent');
    let crecontainer = document.createElement('div');
    crecontainer.classList.add('crecontainer');
    let crename = document.createElement('div');
    crename.classList.add('crename');
    crename.innerHTML = '<p>Give your playlist a name</p>'
    let input_container = document.createElement('div');
    input_container.classList.add('input-container');
    input_container.innerHTML = '<input type="text" name="PlaylistName" id="playlistnameinput">'
    let btn_area = document.createElement('div');
    btn_area.classList.add('btn-area');
    btn_area.innerHTML = '<div class="cre-btn"><p>Create</p></div>'
    let cancel_btn = document.createElement('div');
    cancel_btn.classList.add('crecancelbtn');
    cancel_btn.innerHTML = '<img src="/static/base/icons/cancel.svg" alt="">'

    ReactModalPortal.appendChild(creplaylistcontent);
    creplaylistcontent.appendChild(crecontainer);
    creplaylistcontent.appendChild(cancel_btn);
    crecontainer.appendChild(crename);
    crecontainer.appendChild(input_container);
    crecontainer.appendChild(btn_area);
    let cre_btn_play = document.querySelector('.cre-play-tbn')
    let cre_btn = document.querySelector('.cre-btn');
    let name = document.getElementById('playlistnameinput')

    cre_btn.addEventListener('click', async ()=>{
        let createplaylist = await fetch(`http://${host_address}/create2/playlist/${name.value}`);
        clear_view_content();
        LibararyPage()
        other_block_content('Playlists');
        ReactModalPortal.style.top = '300%';
        sleep(1000).then(()=>{
            ReactModalPortal.remove();
        })
    })
    sleep(1000).then(() => {
        cancel_btn.addEventListener('click', async ()=> {
            ReactModalPortal.style.top = '300%';
            sleep(1000).then(() => {
                ReactModalPortal.remove();
              });
        })
      });
}
function actionmessage(message){
    let message_container = document.createElement('div');
    message_container.classList.add('message-container');
    let message_text = document.createElement('p');
    message_text.classList.add('message-text');
    message_text.innerText = message;
    message_container.appendChild(message_text);
    message_container.style.bottom = '110px';
    message_container.style.opacity='0';
    main.appendChild(message_container);
    sleep(100).then(()=>{
        message_container.style.bottom='104px';
        message_container.style.opacity='1';

    })
    sleep(1800).then(()=>{
        message_container.style.opacity='0';
        message_container.style.bottom = '94px';
    })
    sleep(2000).then(()=>{
        message_container.remove();
    })
}

// =============================================player related functions=====================================
function show_mus(){
    if (details.classList.contains('details-close')) {
        details.classList.remove('details-close');
        details.classList.add('details-open');
        details_inner.classList.add('details-inner-open');
        music_thumnail_img.classList.add('music_thumnail_img_open');
        upbtns.classList.add('show-upbtns');
        track_info.classList.add('track-info-open');
        details_track_name.classList.add('track-name-open');
        details_track_artist.classList.add('track-artist-open');
        main_info_btns.classList.remove('main-info-hidden');
        details_inner_img_container.classList.add('details-inner-img-container-open');
        closeplayer.classList.add('closeplayer-open');
        playpause_btn_closed.remove();
        tapbar.style.bottom = '-50px';
        playerlikedbtn.style.display = 'block';
    } }
function hide_mus(){
    if (details.classList.contains('details-open')) {
        details.classList.remove('details-open');
        details.classList.add('details-close');
        details_inner.classList.remove('details-inner-open');
        music_thumnail_img.classList.remove('music_thumnail_img_open');
        upbtns.classList.remove('show-upbtns');
        track_info.classList.remove('track-info-open');
        details_track_name.classList.remove('track-name-open');
        details_track_artist.classList.remove('track-artist-open');
        main_info_btns.classList.add('main-info-hidden');
        details_inner_img_container.classList.remove('details-inner-img-container-open');
        closeplayer.classList.remove('closeplayer-open');
        player_wrapper.appendChild(playpause_btn_closed);
        tapbar.style.bottom = '0';
        playerlikedbtn.style.display = 'none';
    }}
async function playeractioncontent() {
    try
    {editbar.innerHTML = '';
    editbar.classList.add('edit-bar-show');
    let editbarcontainer = document.createElement('div');
    let edit_container = document.createElement('div');
    let edit_img = document.createElement('div');
    let edit_img_div = document.createElement('div');
    let edit_img_div_img = document.createElement('img');
    let editacts = document.createElement('div');
    let closebtn = document.createElement('div');
    let closebtnwd = document.createElement('p');
    let name_div = document.createElement('div');
    let name_p = document.createElement('p');
    closebtn.setAttribute('id', 'closebtn');
    editacts.setAttribute('id', 'editacts');
    editbarcontainer.setAttribute('id', 'editbarcontainer');
    edit_img.setAttribute('id', 'edit_img');
    edit_container.setAttribute('id', 'edit_container');
    closebtnwd.setAttribute('id', 'closebtnwd');
    name_div.appendChild(name_p);
    name_p.innerText = music_list[0]['name']
    closebtnwd.innerText = 'Close'
    closebtnwd.addEventListener('click', function(){
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
        })
    closebtn.appendChild(closebtnwd);
    editbar.appendChild(editbarcontainer);
    editbarcontainer.appendChild(edit_container);
    editbar.appendChild(closebtn);

    editbarcontainer.appendChild(editacts);
    edit_container.appendChild(edit_img);
    edit_container.appendChild(name_div);
    edit_img.appendChild(edit_img_div);
    edit_img_div.appendChild(edit_img_div_img);
    edit_img_div_img.setAttribute('src', music_list[0]['thumnail']);
    let btn_like = document.createElement('div');
    let btn_addtoplaylist = document.createElement('div');
    btn_like.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/heart.svg' alt=''></div><div><p>Like</p></div>"
    btn_addtoplaylist.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/add-music.svg' alt=''></div><div><p>Add to playlist</p></div>"
    btn_addtoplaylist.addEventListener('click', ()=> {
        addtoplaylistcontent(music_list[0]['id']);
    })
    btn_like.classList.add('editactbtn');
    btn_like.setAttribute('id', 'btn_like');
    btn_addtoplaylist.classList.add('editactbtn');
    btn_addtoplaylist.setAttribute('id', 'btn_addtoplaylist');
    editacts.appendChild(btn_like);
    editacts.appendChild(btn_addtoplaylist);}
    catch {
    let closebtn = document.createElement('div');
    let closebtnwd = document.createElement('p');
    closebtn.setAttribute('id', 'closebtn');
    closebtnwd.setAttribute('id', 'closebtnwd');
    closebtnwd.innerText = 'Close'
    closebtnwd.addEventListener('click', function(){
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
        });
    closebtn.appendChild(closebtnwd);
    editbar.appendChild(closebtn);
    }

}
async function get_last_history() {
    fetch(`http://${host_address}/history/get/last`).then(async response => {
        let jsonform = await response.json()
        if(jsonform['last_track'] != 'no'){
            fetch(`http://${host_address}/get/music/${jsonform['last_track']}/info`).then(async response2 =>{
                music_list = await response2.json();
                loadTrack(track_index);
            })
        } else {
            console.log('statement');
        }
    })
};

async function update_history(id, type) {
    if(type == 'playlist') {await fetch(`http://${host_address}/history/last/playlist/${id}`)}
    else if(type=='track') {await fetch(`http://${host_address}/history/last/track/${id}`);}
}
get_last_history();



let playerlikedbtnclone = document.querySelector('.playerlikedbtn');

function checklikedplayer(id){
        playerlikedbtnclone.dataset.id = id;
        if (checkTrack(id)) {
            playerlikedbtnclone.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
            playerlikedbtnclone.dataset.liked = 'true';
            }
        else {
            playerlikedbtnclone.style.filter ='invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
            playerlikedbtnclone.dataset.liked = 'false';
        }
}

    
playerlikedbtnclone.addEventListener('click', ()=>{
    if (checkTrack(playerlikedbtnclone.dataset.id)) {
        playerlikedbtnclone.style.filter = 'invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
        updateLikedSongs(playerlikedbtnclone.dataset.id, 'remove');
    } else {
        playerlikedbtnclone.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
        updateLikedSongs(playerlikedbtnclone.dataset.id, 'add');
    }
})









// ==============================================Player Bar================================

let now_playing = document.querySelector('.now-playing');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

track_name.addEventListener('click', ()=>{
    window.history.pushState({}, '', `http://${host_address}/track/${track_name.dataset.id}`);
    clear_view_content();
    collection_content(track_name.dataset.id, "Track");
    hide_mus();
})
track_artist.addEventListener('click', ()=>{
    clear_view_content();
    artist_content(track_artist.dataset.id);
    hide_mus();
})




let playpause_btn = document.querySelectorAll('.playpause-track');
let next_btn = document.querySelectorAll('.next-track');
let prev_btn = document.querySelectorAll('.prev-track');

let seek_slider = document.querySelectorAll('.seek_slider');
let reset_btn = document.querySelectorAll('.repeat-track')
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelectorAll('.current-time');
let total_duration = document.querySelectorAll('.total-duration');
let randomIcon = document.querySelectorAll('.random-track');
let curr_track = document.createElement('audio');
let music_thumnail = document.querySelector('.music_thumnail_img');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;




try {
    playpause_btn_closed.addEventListener('click', ()=>{
        playpauseTrack();
    })
} catch (error) {
}

playpause_btn.forEach(item=>{
    item.addEventListener('click', ()=>{
        playpauseTrack();
    })
})
next_btn.forEach(item=>{
    item.addEventListener('click', ()=>{
        nextTrack();
    })
})
prev_btn.forEach(item=>{
    item.addEventListener('click', ()=>{
        prevTrack();
    })
})
randomIcon.forEach(item=>{
    item.addEventListener('click', ()=>{
        randomTrack();
    })
})
reset_btn.forEach(item=>{
    item.addEventListener('click', ()=>{
        reset();
        curr_track.currentTime = 0;
        curr_track.play()
    })
})

seek_slider.forEach(item => {
    item.addEventListener('change', ()=>{
        seekTo();
    });
})


function loadTrack(list, track_index){
    actionbtn.dataset.id = music_list[track_index].id;
    var dataforplayerbar = music_list[track_index];
    clearInterval(updateTimer);
    reset();
    curr_track.src = music_list[track_index].music;
    update_history(music_list[track_index].id, 'track');
    curr_track.load();
    music_thumnail.style = 'filter: none'
    music_thumnail.setAttribute('src', music_list[track_index].thumnail);
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    track_name.dataset.id = music_list[track_index].id;
    track_artist.dataset.id = music_list[track_index].artist_id;
    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
    checklikedplayer(music_list[track_index].id);
}



function reset(){
    curr_time.forEach(item =>{
        item.textContent = "00:00";
    })
    total_duration.forEach(item =>{
        item.textContent = "00:00";
    })
    seek_slider.forEach(item =>{
        item.textContent = "00:00";
    })
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.forEach(item => {
        item.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    })
    try {
        playpause_btn_closed.innerHTML = '<i class="fa fa-pause fa-5x"></i>'
    } catch (error) {
        
    }
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.forEach(item => {
        item.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    })
    try {
        playpause_btn_closed.innerHTML = '<i class="fa fa-play fa-5x"></i>'
    } catch (error) {
        
    }

}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    update_history(music_list[track_index].id, 'track');
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    update_history(music_list[track_index].id, 'track');
    playTrack();
}

function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}


function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        seek_slider.forEach(item =>{
            item.value = seekPosition;
        })

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }


        curr_time.forEach(item =>{
            item.textContent = currentMinutes + ":" + currentSeconds;
        })
        total_duration.forEach(item =>{
            item.textContent = durationMinutes + ":" + durationMinutes;
        })
    }
}
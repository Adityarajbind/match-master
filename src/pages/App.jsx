import { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import Icons from '../components/Icons';

// Import your background music file
import clicked from '..\\assets\\Sound effect\\click_sound.mp3';

function App() {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Icon, setPlayer1Icon] = useState(0); // Index for player 1 icon
  const [player2Icon, setPlayer2Icon] = useState(0); // Index for player 2 icon
  const navigate = useNavigate();

  const music = new Audio(clicked);
 function user_clicked() {
       music.play();
 }
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setPlayer1Icon(current), // Save current icon index
  };

  const settingsPlayer2 = {
    ...settings,
    afterChange: (current) => setPlayer2Icon(current), // Save current icon index for player 2
  };
  const Images = ["icons hero/hulk.jpg", "icons hero/20814893-9d12-4039-b8f0-31109a383538.jpg", "icons hero/iron man.jpg", "icons hero/thor.jpg", "icons hero/kratos.jpg", "icons hero/pikachu.jpg", "icons hero/deadpool.jpg", "icons hero/aizawa.jpg", "icons hero/darkshadow.jpg", "icons hero/deku.jpg", "icons hero/chopper.jpg", "icons hero/Luffy.jpg", "icons hero/sanji.jpg", "icons hero/zoro.jpg"]
  const handleStartGame = () => {
    user_clicked()
    // Navigate to GAMEscreen and pass player names and selected icon images
    navigate('/gamescreen', {
      state: {
        player1Name,
        player2Name,
        player1Icon: Images[player1Icon], // Get the image URL by index
        player2Icon: Images[player2Icon],
      },
    });
  };
  return (
    <>
      <div class="background-container" >
        <div class="orange-box"></div>
        <div class="blue-box"></div>
      </div>
      <div class="logo">
        <img src="/icons hero/cooltext465572252435048.png" alt="" />
      </div>
      <main >
        <div class="charctericon">
          <div class="char-logo">
            <Slider {...settings}>
              {Images.map((img, index) => (
                <Icons src={img} key={index} />
              ))}
            </Slider>
          </div>
          <div class="name player1">{player1Name}</div>
        </div>
        <div class="fomr-container">
          <div class="inputs">
            <input type="text" id="player1" placeholder="PLAYER 1" maxlength="16" value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)} autoComplete='off' onClick={user_clicked}/>
            <input type="text" id="player2" placeholder="PLAYER 2" maxlength="16" value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)} autoComplete='off' onClick={user_clicked}/>
          </div>
          <button onClick={handleStartGame}>START</button>
        </div>
        <div class="charctericon">
          <div class="char-logo">
            <Slider {...settingsPlayer2}>
              {Images.map((img, index) => (
                <Icons src={img} key={index} />
              ))}
            </Slider>
          </div>
          <div class="name player2">{player2Name}</div>
        </div>
      </main>
    </>
  )
}

export default App

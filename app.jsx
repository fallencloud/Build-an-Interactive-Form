const SPEAKERS = [
  {
    key: 1,
    name: "Vivianne",
    pic: "img/vivianne.png",
    bio: "Vivianne is a web developer and teacher who is passionate about building scalable, data-driven web apps, especially ones that address old problems with new tech!",
    topic: "JavaScript Frameworks"
},
{
    key: 2,
    name: "Ecma",
    pic: "img/ecma.png",
    bio: "Ecma found her passion for programming and teaching over 15 years ago. She is excited to introduce you to all of the wonders of JavaScript.",
    topic: "JavaScript Libraries"
},
{
    key: 3,
    name: "Nodestradomus",
    pic: "img/nodestradamus.png", 
    bio: "\"NodeStra\" is a software engineer and philosopher trying to leave the world better than he found it. He codes for non-profits, eCommerce, and large-scale web apps.",
    topic: "Node"
},
{
    key: 4,
    name: "Robbie",
    pic: "img/robbie.png",
    bio: "Robbie is a JavaScript developer working on large-scale applications. He's also a teacher who strives to support students in removing barriers to learning code.",
    topic: "Express"
},
{
    key: 5,
    name: "Jay",
    pic: "img/jay.png",
    bio: "Jay is a developer, author of CSS: The Missing Manual, JavaScript & jQuery: The Missing Manual, and web development teacher. ",
    topic: "Build Tools"
},
{
    key: 6,
    name: "JSON",
    pic: "img/json.png",
    bio: "All of his professional life, Json has worked with computers online; he is a polyglot programmer and likes using the right tools for the job",
    topic: "npm"
}
];

const TOPICS = [
  {
    key: 1,
    title: "Main Conference",
    desc: " This conference aims to provide you with the latest information of the full JavaScript development stack."
  },
  {
    key: 2,
    title: "JavaScript Frameworks Workshop",
    desc: "Keeping up with JavaScript frameworks can be a challenge. There are a lot of them, and seemingly another one every month. How do you know which ones might be right for your project? What are their strengths and weaknesses? How do you get started?"
  },
  {
    key: 3,
    title: "JavaScript Libraries Workshop",
    desc: "JavaScript libraries, seem to appear at least once a week. As a developer, it's time consuming to test tool. Let us help you with a brief review of 12 JS libraries for web interfaces development that are certainly worth of a closer look."
  },
  {
    key: 4,
    title: "Express Workshop",
    desc: "Express is a popular unopinionated web framework, written in JavaScript and hosted within the node.js runtime environment. Let us explain some of the key benefits of this framework, how to set up your development environment and how to perform common web development and deployment tasks."
  },
  {
    key: 5,
    title: "Node.js Workshop",
    desc: "Join us for a Node.js event focused on the Ecosystem of Node. This is a mini-summit featuring presentations, workshops and keynotes covering everything from technical talks to case studies detailing Node.js enterprise implementation at some of the world’s largest companies."
  },
  {
    key: 6,
    title: "Build Tools",
    desc: "Back in the day, it was enough to concatenate scripts together. Times have changed, though, and now distributing your JavaScript code can be a complicated endeavor. We'll show you how to simplify dependency management through a variety of build tools."
  },
  {
    key: 7,
    title: "npm",
    desc: "npm is a command line tool to help you manage Node.js modules and this course will get you up and running with npm. We'll take a look at the several different ways you can install packages with npm. We'll also take a look at updating and removing packages using npm." 
  }
]



function Header() {
  return (
    <div>
      <header id="header">
      <h2>Full Stack Conf</h2>
        <nav>
          <i className="material-icons" id="drop-btn">menu</i>
          <div id="nav" className="drop-body">
          <a href="#about">About</a>
          <a href="#speakers">Speakers</a>
          <a href="#descriptions">Topic Details</a>
          <a href="#register" className="registration">Register</a>
          </div>
        </nav>
      </header>
    </div>

  );
}

function Jumbotron() {
  return (
    <div>
      <section id="jumbotron">
            <h1>Full Stack Conf</h1>
            <h3>The latest info on using JavaScript for your development stack!</h3>
            <div id="splash-buttons">
                <input type="button" value="Register Now" id="btn-register" className="registration" />
                <a href="#speakers"><input type="button" value="See Speakers" id="btn-speakers"/></a>
            </div>
      </section>
    </div>
  )
}

function About() {
  return (
    <div>
      <section id="about">
        <div className="about">
            <h3>Event Speakers</h3>
            <p>
                Our expert speaker lineup was just announced, so don't wait too long before grabbing your tickets!
            </p>
            <p>
                Want to meet the international JavaScript community and share skills with some of the world's top experts, hackers, and makers? Be the first to know what to expect for the future of JavaScript.
            </p>
        <p>
            Full Stack Conf is committed to being inclusive and welcoming for everyone. We look forward to another intensive day of learning and sharing.
        </p>
        </div>
        <div className="about">
            <h3>About Full Stack Conf</h3>
            <img src="img/pdx.jpg" alt="a picture of portland oregan"/>
            <p>
                The beautiful city of Portland, Oregon will be the host city for Full Stack Conf!
            </p>
            <p>
                Explore the future of JavaScript with a lineup of industry professionals. Discover new techniques to advance your career as a web developer.
            </p>
        </div>
        <div className="about">
            <h3>Topics</h3>
            <ul id="events">
                <li>Main Conference</li>
                <li>JavaScript Frameworks</li>
                <li>JavaScript Libraries</li>
                <li>Node.js</li>
                <li>Express Workshop</li>
                <li>Build Tools</li>
                <li>npm</li>
            </ul>
        </div>
      </section>
    </div>
  )
}

function Speaker(props) {
  return (
    <div className="card">
      <img src={props.pic} />
      <h3>{props.topic}</h3>
      <p>{props.bio}</p>
  </div>
  )
}

Speaker.propTypes = {
  pic: React.PropTypes.string.isRequired,
  topic: React.PropTypes.string.isRequired,
  bio: React.PropTypes.string.isRequired
}

function Speakers(props) {
  return (
    <div>
      <h2>Speakers</h2>
        <section id="speakers">            
           {props.speakers.map(function(speaker) {
             return <Speaker pic={speaker.pic} bio={speaker.bio} topic={speaker.topic} key={speaker.key}/>
           })} 
        </section>
    </div>
  )
}

function Topics(props) {
  return(
    <li>
      <h3>{props.title}</h3>
      <p>{props.desc}</p>
    </li>
  )
}

function Descriptions(props) {
  return(
    <div>
      <section id="descriptions">
            <h2>Topic Details</h2>
            <ul id="schedList" className="accordian">
                {props.topics.map(function(topic) {
                  return <Topics title={topic.title} desc={topic.desc} key={topic.key} />
                })}
            </ul> 
            <div id="callout">
                <input type="button" id="btn-register-now" value="Don't miss out! Register now!" className="registration" />
            </div>
          </section>
    </div>
  )
}

function Main(props) {
  return (
    <div>
      <main>
        <Jumbotron />
        <About />
        <Speakers speakers={props.speakers}/>
        <Descriptions topics={props.topics}/>
      </main>
    </div>
  );
}

function Footer() {
  return (
    <div>
      <footer id="footer">
        <div id="shoutout">
            <h3>About Sharina V.</h3>
            <p>
                Sharina V. Jones is a front-end web developer with aspirations of mastering the entire web stack.
            </p>
        </div>
        <div id="contact">
            <h3>Stay up-to-date on Full Stack Conf</h3>
            <input type="email" id="email" placeholder="Email" />>
            <input type="button" id="btn-signup" value="Sign up" />>
        </div>
      </footer>
    </div>
  )
}

function Modal() {
  return (
    <div>
       <div id="modal">
        <div id="form-body">
        <header>
            <span>Register for</span>
            <h1>Full Stack Conf</h1>
          </header>
      
          <form action="success.html" method="post">
                    
            <fieldset className="basic">         
              <legend>Basic Info</legend>
              
              <label for="name">Name:</label>
              <input type="text" id="name" name="user_name" autofocus />
              
              <label for="mail">Email:</label>
              <input type="text" id="mail" name="user_email" />
              
              <label for="title">Job Role</label>
              <select id="title" name="user_title">
                <option value="full-stack js developer">Full Stack JavaScript Developer</option>
                <option value="front-end developer">Front End Developer</option>
                <option value="back-end developer">Back End Developer</option>
                <option value="designer">Designer</option>          
                <option value="student">Student</option>
                <option value="other">Other</option>  
              </select>
              <input type="text" id="other-title" name="other-title" placeholder="Your Job Role" />          
            </fieldset>
            
            <fieldset className="shirt">
              <legend>T-Shirt Info</legend>
              
              <div>
                <label for="size">Size:</label>
                <select id="size" name="user_size">
                  <option value="small">S</option>
                  <option value="medium" selected>M</option>
                  <option value="large">L</option>
                  <option value="extra large">XL</option>
                </select>
              </div>
      
              <div>
                <label for="design">Design:</label>
                <select id="design" name="user_design">
                  <option>Select Theme</option>
                  <option value="js puns">Theme - JS Puns</option>
                  <option value="heart js">Theme - I &#9829; JS</option>
                </select>
              </div>
      
              <div id="colors-js-puns" className="">
                <label for="color">Color:</label>
                <select id="color">
                  <option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
                  <option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
                  <option value="gold">Gold (JS Puns shirt only)</option> 
                  <option value="tomato">Tomato (I &#9829; JS shirt only)</option>
                  <option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
                  <option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> 
                </select>
              </div>                
            </fieldset>
      
            <fieldset className="activities">
              <legend>Register for Activities</legend>
              <label><input type="checkbox" name="all" /> Main Conference — $200</label>
              <label><input type="checkbox" name="js-frameworks" /> JavaScript Frameworks Workshop — Tuesday 9am-12pm, $100</label>
              <label><input type="checkbox" name="js-libs" /> JavaScript Libraries Workshop — Tuesday 1pm-4pm, $100</label>
              <label><input type="checkbox" name="express" /> Express Workshop — Tuesday 9am-12pm, $100</label>
              <label><input type="checkbox" name="node" /> Node.js Workshop — Tuesday 1pm-4pm, $100</label>          
              <label><input type="checkbox" name="build-tools" /> Build tools Workshop — Wednesday 9am-12pm, $100</label>
              <label><input type="checkbox" name="npm" /> npm Workshop — Wednesday 1pm-4pm, $100</label>
              <legend id="cost"></legend>         	
            </fieldset>
            <fieldset className="payment">
              <legend>Payment Info</legend>
      
              <label for="payment">I'm going to pay with:</label>
              <select id="payment" name="user_payment">
                <option value="select_method">Select Payment Method</option>
                <option value="credit card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bitcoin">Bitcoin</option>
              </select>
      
              <div id="credit-card" className="credit-card">
      
                <div className="col-6 col">
                  <label for="cc-num">Card Number:</label>
                    <input id="cc-num" name="user_cc-num" type="text"/>
                </div>
      
                <div className="col-3 col">
                  <label for="zip">Zip Code:</label>
                  <input id="zip" name="user_zip" type="text"/> 
                </div>
      
                <div className="col-3 col">
                  <label for="cvv">CVV:</label>
                  <input id="cvv" name="user_cvv" type="text"/> 
                </div>
      
                <label for="exp-month">Expiration Date:</label>
                <select id="exp-month" name="user_exp-month">
                  <option value="1">1 - January</option>
                  <option value="2">2 - February</option>
                  <option value="3">3 - March</option>
                  <option value="4">4 - April</option>
                  <option value="5">5 - May</option>
                  <option value="6">6 - June</option>
                  <option value="7">7 - July</option>
                  <option value="8">8 - August</option>
                  <option value="9">9 - September</option>
                  <option value="10">10 - October</option>
                  <option value="11">11 - November</option>	
                  <option value="12">12 - December</option>          		          
                </select>
                <label for="exp-year">Expiration Year:</label>
                <select id="exp-year" name="user_exp-year">
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>        		          
                </select> 	                  	         
              </div>
      
              <div id="paypal">
                  <p>If you selected the PayPal option we'll take you to Paypal's site to set up your billing information, when you click “Register” below.</p>
              </div> 
      
              <div id="bitcoin">
                  <p>If you selected the Bitcoin option we'll take you to the Coinbase site to set up your billing information. Due to the nature of exchanging Bitcoin, all Bitcoin transactions will be final.</p>
              </div>                  
      
            </fieldset>        
            <button type="button" id="next">Next</button>  
            <button type="submit" id="submit">Register</button>
            <button type="button" id="cancel">Cancel</button>
          </form>
        </div>      
</div>
    </div>
  )
}

function Application(props) {
  return (
   <div>
    <Header />
    <Main speakers={props.speakers} topics={props.topics}/>
    <Footer />
    <Modal />
   </div>
  );
}

ReactDOM.render(<Application speakers={SPEAKERS} topics={TOPICS}/>,
  document.getElementById('container')
)
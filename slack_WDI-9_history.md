



Jude Molke [11:42 AM] 
joined #wdi-dtla-09, and invited @grant, @callende, @kedariyer, @meredith, @gonzales1595, @noahflick, @akhadisurya, @murtato, @bmorando, @martinrosas, @gibster, @ajalmaguer, @jonathanda1, @maxcherkasskikh, @carlos3, @trevorpham


----- March 1st -----
Max Cherkasskikh [5:55 PM] 
Hello. Is anyone else having  a little trouble understanding the whole "variables" assignments and calculations? Anyone have a better explanation for it?

[5:58] 
For instance:
var x = 1;
var y = 2;
var z = 3;
x = y;
y = z;
z = x;

[5:58] 
Should come out to equal 2

[5:58] 
And I'm still having trouble understanding how the equation arrived at 2.

Max Cherkasskikh [6:05 PM] 
My thinking is: (substituting the numbers)
1=2
2=3
3=2

[6:06] 
Writing the first line as 1=2 will set x equal to 2 because what's on the right is equal to 2 (y).

[6:07] 
Writing the second line as 2=3 because y is equal to 2 and z is equal to 3 so y becomes equals to 3.

[6:09] 
Writing the third line as 3=2 because what's on the right of line two is equal to 3 now. And since the last value for x was 2 and it's on the right of line three y becomes two.

[6:09] 
Am I correct in my calculation???

[6:10] 
I'm so confused with all this number substitution. It honestly sounds pointless to me and feels like it just defeat the purpose.

[6:10] 
Also I'm confused on this little expression:
var x;
/* Your Expression */

[6:12] 
is everything between /*   */ a "side comment" that has nothing to do with the actual code (like a side foot note) or is it still behaving like code?


----- March 2nd -----
Jack Stein [10:03 AM] 
joined #wdi-dtla-09 by invitation from @jude, along with @ctruth544, @adamwilbert


----- March 3rd -----
Noah Flick [1:45 PM] 
Question - maybe an instructor can answer this - How much hard drive space do we need for installfest  tomorrow?

AJ Almaguer [3:06 PM] 
Hey Max, you can’t substitute values in for the variables at the same time. It doesn’t work exactly like in algebra. The computer does the substitutions and evaluations one line at a time.

[3:07] 
So in your example, you have to pretend you’re playing that game Simon Says with the computer.

For instance:
var x = 1; //here you’re creating a variable x and setting x equal to 1.
var y = 2; // here you’re creating a variable y and setting it equal to 2.
var z = 3; // now you’re creating variable z and setting it equal to 3.

x = y; // now you’re OVERWRITING x to whatever y is at this time. After this line is evaluated, x will be 2.

y = z; // same thing. You’re changing whatever y is to what z currently is. Therefore, y will now be 3.

z = x; // Finally, you’re changing z to what x is right now. If you remember, x was changed to 2 earlier. (edited)

[3:11] 
and yes, everyting between these "/* */ “  will be ignored by the computer. The purpose of comments is to make code easier to read for humans.

Meredith Bryan [4:28 PM] 
@hannah.howard:

hannah howard [4:28 PM] 
joined #wdi-dtla-09 by invitation from @meredith

hannah howard [4:30 PM] 
@noahflick: generally programming tools are not super space intensive. However, I’d imagine you’ll need a few GB (not more than 5). I would also recommend keeping at least 10% of free space on your hard drive for performance reasons during coding.

hannah howard [4:35 PM] 
@ajalmaguer: exactly. it’s not like algebra (at least in most programming languages) — which can be confusing. @maxcherkasskikh any time you use the = sign you’r saying “set the value of the variable on the left to the value on the right” — and you’re overwriting the current value.

Victor Tran [5:12 PM] 
Hi everybody, I'm running into kind of a snag with the rps.js file in Homework 4. This is probably something I should've noticed in Homework 2 or 3. The instructions say that we should see this code on the assignment:

var getInput = function() {
  console.log("Please choose either 'rock', 'paper', or 'scissors'.")
  var answer = prompt();
  return answer;
}

var randomPlay = function() {
   var randomNumber = Math.random();
   if (randomNumber < 0.33) {
       return 'rock';
   } else if (randomNumber < 0.66) {
       return 'paper';
   } else {
       return 'scissors';
   }
}

But instead I'm seeing this when I open the cloned rockpaperscissors.js file on my computer:
function getInput() {
   console.log("Please choose either 'rock', 'paper', or 'scissors'.")
   return prompt();
}
function randomPlay() {
   var randomNumber = Math.random();
   if (randomNumber < 0.33) {
       return "rock";
   } else if (randomNumber < 0.66) {
       return "paper";
   } else {
       return "scissors";
   }
}

Looks to me like the initial "var" and "function" were mixed up, but otherwise everything else stayed the same. In Homework 4, the assignment asks to scroll down to this code below:

var getWinner = function(playerMove, computerMove) {
   // This function should either give us back 'player', 'computer', or 'tie'.
   // The rules of the game are that rock beats scissors, scissors beats paper, and paper beats rock.
   // Assume that the only possible input values we can get are 'rock', 'paper', and 'scissors'.
}

Again, on the cloned file, I see "function" where "var" should be listed in the syntax. Should I go ahead and change all the "function"'s to "var"'s? Please let me know before I start fiddling around and creating black holes in the universe :simple_smile: (edited)

Max Cherkasskikh [5:20 PM] 
Thanks guys. I appreciate the explanation. I went over the section again and it made a little more sense.

However, this exercise still didn't quite make sense because of the language:
Write an expression that evaluates to 10 more than x;
if x is 10, the expression should evaluate to 20;
if x is 50, the expression should evaluate to 60.
Test your answer by changing the first line to var x = someValue; and clicking the 'play' button.

Now replace that first expression with an expression that evaluates to triple the value of x, plus five;
if x is 5, the expression should evaluate to 20;
if x is 10, the expression should evaluate to 35.
What happens if you set x to 100? Does it work like you'd expect?

Next, replace that expression with one that evaluates to "Hello, x.";
if x is "Alice", the expression should evaluate to "Hello, Alice.";
if x is "Bob", the expression should evaluate to "Hello, Bob.".

Finally, replace the prior expression with one that evaluates to "Goodbye, x.";
if x is "Charlene", the expression should evaluate to "Goodbye, Charlene.";
if x is "David", the expression should evaluate to "Goodbye, David".

Jude Molke [5:50 PM] 
Hey Guys!  Great opportunity to network with Alumni and get some first hand insight on what your next 12 weeks are going to be like!  I’ve been told it’s great coffee and bagels too :simple_smile:   https://generalassemb.ly/education/alumni-coding-coffee/los-angeles/21953
Alumni: Coding & Coffee
Get your coffee fix and code along with your fellow GA alumni. (117KB)


Noah Flick [6:39 PM] 
@hannah.howard Thanks. Better clean some stuff out...


----- March 4th -----
Angie Zazueta [12:28 PM] 
joined #wdi-dtla-09 by invitation from @jude, along with @josephdc, @marcos27, @jobethpauline15, @wen, @jeffreytunches, @donghyuntimkang

Jobeth Pauline Zapata [1:28 PM] 
Thank you. Yehey!
1  

Grant Roy [1:31 PM] 
https://github.com/GA-WDI/installfest

GitHub
GA-WDI/installfest
installfest - WDI student dev environment setup scripts
1  

hannah howard [2:31 PM] 
Hey everyone, for posteriety… our class agreements. I may refer back to these:

[2:31] 
WDI DTLA 9 Class Agreements

Practice good respectful communication (especially on Slack)
Ask questions and stay curious
Be patient and focus on today
Be happy and stay positive
Emphasize collaboration over competition
Spread knowledge around
Encourage feedback and constructive criticism
Be humble and check your ego
Lead on prior experience
Stay on task and minimize distractions
1  

Mark Regis [2:47 PM] 
joined #wdi-dtla-09 by invitation from @jude

Jeffrey Tunches [5:37 PM] 
thx!!-)


----- March 5th -----
Max Cherkasskikh [1:31 PM] 
@jude: Can we get the "Full Time School Status"  document you were talking about for a reduced Metro (subway) monthly ticket please :simple_smile:

[1:33] 
because I live a five minute walk (in Hollywood) from the red line that takes me right into downtown where I can transfer to the blue line that takes me almost right next door to "The Reef" where the school is located.

Max Cherkasskikh [1:39 PM] 
Also, can anyone tell me what I am missing from the syntax of the first exercise of section 5 please:

var sayHello = function(name) {
   return "Hello" + name;
}

I need to be able to input the name and get a "Hello ____________" result.

Max Cherkasskikh [2:00 PM] 
NEVER MIND! After rereading and struggling to change the syntax a million times I narrowed it down to:

var sayHello = function(name) {
   return "Hello" + ' ' + name;
}
sayHello("Max");

Max Cherkasskikh [2:20 PM] 
You know. I'll say this about this pre-course work (to whomever produced the actual thing) for future classes...

I think both of our teachers @grant and @hannah.howard  agreed along with myself and other students that the exercise language was extremely confusing and vague.

But I would also go further by saying that it would have been helpful if the actual information in the pre-course work maybe included a little more syntax information on how to build these exercises (meaning: how to build the syntax properly) instead of just giving a few examples and expecting us to figure out the syntax on our own (although I suspect that part of the point of the exercise was to figure out the syntax anyway).

But I think that it would have saved most of us some hair-ripping, frustration, time and stress if we were to get a bit more info on the syntax building part of the exercise. Because personally I understand all the information and all the little sections and I do well on the quiz part of it. But when it comes to the exercise I still can't put the info into practice because I'm not sure if I'm writing the syntax correctly. And than a bunch of hair-ripping and banging head against the wall ensues.

rant over. sorry. (edited)

Victor Tran [10:43 PM] 
Can anyone please help me look over my code for Homework 4.5? I’ve been working on this assignment for days and still can’t see where I made a mistake. It’s not returning a prompt, and I’ve already checked it with several other peoples’ codes. It also brings my computer into an infinite loop every time I try to run it, so BE CAREFUL BEFORE RUNNING THIS CODE! The browser just says “it’s a Tie!” on the bottom and plays an infinite number of games until I force quit the browser. Here’s the replit link to my rock paper scissors game: https://repl.it/BtYF/0
repl.it
Run code in a variety of languages from your browser! (3KB)


----- March 6th -----
Wen Jen [12:42 PM] 
Hey class, on section 4.2.1.

[12:43] 
for (x =0; x <= max; x++) {
   if ( (x % 3 || x % 5) == 0) {
   result = "fizzbuzz";
   console.log(result);
   } else if (x % 3 == false) {
   result = "fizz";
   console.log(result)
} else if (x % 5 == false) {
   result = "buzz";
   console.log(result);
} else {
   result = x;
   console.log(result);
    }
}

I got this, but was wondering if I did the first if   **  if ( (x % 3 || x % 5) == 0) ** part correctly,  did someone get another expression for this part?  Thanks in advance

Max Cherkasskikh [5:55 PM] 
So I think I'm done with editing my code for the Fundamentals assignment. But I edited it in repl.it. How do I save it and push it to my personal repository? Because I just copied the code into repl.it and edited there. Do I save it there??? How do I know I saved it in the right place than?

Kedar Iyer [7:40 PM] 
@maxcherkasskikh: repl.it is separate from the class repo. Once you have working code there, you will have to copy it back into a file on your personal repo then push it to Github

Max Cherkasskikh [7:46 PM] 
where should i copy it?

[7:46] 
a word document?

[7:49] 
because when i open it up through the terminal it opens up in an uneducable browser page.

Andrew Gibbs [8:45 PM] 
after u have forked the repo in your github account

[8:46] 
u copy ur custom url and then clone it into the directory that you are going to use the this assignment, i believe inside of you “fundamentals” folder

[8:46] 
after you have cloned it you will have a folder wdi-fundamentals-rps

[8:47] 
inside that folder is an app folder and inside that is a js folder which has the .js file you need to have your code in

[8:47] 
after u edit it in sublminetext, you commit it and then push it to student


----- March 7th -----
Max Cherkasskikh [9:59 AM] 
Possible Group Names:
1  

[10:00] 
Ocean's Nine
Nine Lives
911
369
Power 9
Downtown Crew
T3ch9
9th Wonder Of The World
The Slackers

[10:00] 
Vote mid class.

Carlos Borges [10:11 AM] 
Cloud 9

AJ Almaguer [10:19 AM] 
bash profile article

[10:19] 
https://natelandau.com/my-mac-osx-bash_profile/
natelandau.com
My Mac OSX Bash Profile
I've spent years curating a collection of Mac bash aliases and shortcuts to make my life easier. My full .bash_profile is below, feel free to take whatever you find useful and put it to good use.
July 2nd, 2013 at 3:57 PM

[10:20] 
group 3, here’s a google doc.

[10:20] 
https://docs.google.com/document/d/1WIFlDVGhHaLFmSM-VAfHhzBlo_TnUMMTt3KaXa-xT3Y/edit#heading=h.ucn1bigp31yb

Andrew Gibbs [10:29 AM] 
http://code.tutsplus.com/tutorials/sublime-text-2-tips-and-tricks-updated--net-21519

hannah howard [11:25 AM] 
Presentation: https://docs.google.com/presentation/d/1gLVlBsJ6WVqRPPYZ42znio-l9nJ8MxRwYwk2sOISViE/edit?usp=sharing

[11:26] 
Sublime Keyboard Shortcut reference: http://docs.sublimetext.info/en/latest/reference/keyboard_shortcuts_osx.html

Kedar Iyer [11:32 AM] 
@channel Slides for the Command Line lesson

[11:32] 
https://presentations.generalassemb.ly/9c45a6b2cfac9131f56e#/1

AJ Almaguer [11:33 AM] 
i took notes for the other groups in the google doc too: https://docs.google.com/document/d/1WIFlDVGhHaLFmSM-VAfHhzBlo_TnUMMTt3KaXa-xT3Y/edit#heading=h.ucn1bigp31yb
1  

Andrew Gibbs [11:38 AM] 
if the presentation link doesnt look the same, delete the 1 at the end of the url

Kedar Iyer [1:12 PM] 
@jeffreytunches: sudo -k will kill the sudo for the current session

Grant Roy [2:16 PM] 
@group pre-work quiz link: https://docs.google.com/a/generalassemb.ly/forms/d/17NTeFOoKTp3D_Opt50C8ay5dbIm4OjByW4jslZHicLQ/viewform
Google Docs
Pre-work: Quiz (211KB)

Marcos Felix [2:32 PM] 
What do we do after we are done with the quiz?

Jude Molke [3:47 PM] 
@channel: Hey everyone, please be sure to fill your profile survey out by end of day today! https://outcomes.generalassemb.ly/courses/18138/surveys/background/new

Mark Regis [4:33 PM] 
@channel:  As promised, here is the link to the Google Drive where I will upload all of your Outcomes materials in the coming weeks.  https://drive.google.com/folderview?id=0B88X4bqxsPZWT0VTajRPNXp5YkU&usp=sharing -  Looking forward to getting to know and working with everyone for the next few months.  Finally, as I said, I'm here to help with anything/everything you need, so don't be shy about reaching out if you have any questions.  Thanks!

Grant Roy [4:58 PM] 
https://github.com/ga-students/WDI_DTLA_9/tree/master/work/w01

Max Cherkasskikh [5:02 PM] 
Hey @jude this is the message I'm getting when I try to access the survey you asked us to fill out:

Oops! You don't have access to this survey
Please make sure you are logged in with the same account you were enrolled with. If you are still having trouble, please contact your course producer for more assistance.

[5:02] 
What do I do?

Grant Roy [5:04 PM] 
added a Plain Text snippet 
##Adding files to your global .gitignore
```bash
$ nano ~/.gitignore
Add Comment Click to expand inline 83 lines
Kedar Iyer [5:11 PM] 
@channel Slack me your github username if you’re still getting a 404 on the github link

Joseph Del Castillo [5:12 PM] 
@kedar github josephdc

Max Cherkasskikh [5:13 PM] 
@kedariyer: github Max Cherkasskikh

i think...

Kedar Iyer [5:13 PM] 
that’s probably not it

[5:13] 
it should be a single word username

Jeffrey Tunches [5:13 PM] 
@jeffreytunches

Max Cherkasskikh [5:14 PM] 
@maxcherkasskikh

than...

Brigette Morando [5:16 PM] 
@bmorando

Max Cherkasskikh [5:16 PM] 
uploaded and commented on an image: Slack for iOS Upload 
1 Comment
This is all I see when I get to my git hub page

Kedar Iyer [5:16 PM] 
ok, you guys should all be added, try now

Max Cherkasskikh [5:17 PM] 
works for mel

Jonathan Dai [6:01 PM] 
@kedariyer: Hey Kedar I’m getting the 404 now but it was working earlier

Grant Roy [6:06 PM] 
added a Plain Text snippet: star_wars_cli_practice.md 
## Star Wars, the Command Line, and The Battle for the Fate of the Universe
Working in the command line is a key skill to develop as a programmer. It's a big break from what you're used to, and practice makes (eventually) perfect. Let's explore the Star Wars narrative using the command line, and ONLY the command line.
####"A New Hope"
Add Comment Click to expand inline 52 lines
Noah Flick [6:18 PM] 
ok it appears that one does not simply "undo a commit".  My guess is:  git reset --soft HEAD^    ...does anyone concur?

AJ Almaguer [6:20 PM] 
here’s a good tutorial on making branches https://www.atlassian.com/git/tutorials/using-branches/git-branch
Atlassian Git Tutorial
Git branch
The git branch command is your general-purpose branch administration tool. It lets you create isolated development environments within a single repository. (94KB)

1  

Victor Tran [8:52 PM] 
I’m trying to commit my changes to push into the master branch, but I’m getting this prompt every time I try to commit with a message:

$ git commit -m "Prework RPS"
U    app/js/rockpaperscissors.js
error: commit is not possible because you have unmerged files.
hint: Fix them up in the work tree, and then use 'git add/rm <file>'
hint: as appropriate to mark resolution and make a commit.
fatal: Exiting because of an unresolved conflict.

[8:53] 
Anybody know how I can access the git tree and get my prework submitted? :disappointed:

Marcos Felix [9:34 PM] 
git -log

Victor Tran [9:35 PM] 
added a Plain Text snippet: My attempt to submit the prework assignment to github via Push 
Your branch is up-to-date with 'origin/student'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
    new file:   Victor.Tran.rps.js
Add Comment Click to expand inline 31 lines

----- March 8th -----
Jude Molke [8:38 AM] 
@channel: Morning everyone!  I’m still missing some profile surveys!  Please do this during your first break if you did not complete it last night.  https://outcomes.generalassemb.ly/courses/18138/surveys/background/new

Max Cherkasskikh [8:52 AM] 
Hey guys. Don't know if this will be helpful. Check it out. It's a "Git Command Cheat Sheet"

https://training.github.com/kit/downloads/github-git-cheat-sheet.pdf

Marcos Felix [9:15 AM] 
T3chN9ne
2  

Kedar Iyer [9:59 AM] 
@channel: slides for Intro to HTML lesson

[9:59] 
https://presentations.generalassemb.ly/d0a36c1b88d99856eda9#/

Kedar Iyer [10:08 AM] 
git clone https://github.com/ga-students/WDI_DTLA_9.git

[10:08] 
to setup the class repo

AJ Almaguer [10:14 AM] 
github username: ajalmaguer

Marcos Felix [10:15 AM] 
github username: marcos27

Jobeth Pauline Zapata [10:17 AM] 
github username - Lovejopau (edited)

Kedar Iyer [10:21 AM] 
cp -R WDI_DTLA_9/work/w01/d02/intro_html_markdown/ workspace/w01/d02

Jeffrey Tunches [10:55 AM] 
markdown (https://daringfireball.net/projects/markdown/syntax)

AJ Almaguer [11:49 AM] 
made a spreadsheet of the elements we went over today

[11:49] 
https://docs.google.com/spreadsheets/d/1zgJzwDb3-6IgIZ7BsoL6BtovYGaGpl9Rj8s_xmBs8ME/edit#gid=0
2  

Max Cherkasskikh [1:49 PM] 
This is awesome ^^^ Thanks AJ

Andrew Gibbs [2:29 PM] 
validator https://validator.w3.org/#validate_by_input
The W3C Markup Validation Service
W3C's easy-to-use markup validation service, based on SGML and XML parsers.

[2:30] 
css beauty http://www.cleancss.com/css-beautify/?_ga=1.214540560.660953488.1448680370
CSS Formatter and Beautifier
Format your CSS to clean it up and beautify it. Make your CSS easier to read and validate it.

Andrew Gibbs [2:35 PM] 
git clone https://github.com/ga-students/WDI_DTLA_9.git

[2:36] 
for the cloning

hannah howard [2:42 PM] 
Presentation: https://docs.google.com/presentation/d/1aSwzt5k-J7z7k1ODlWNNm_XBoZFVf0Nl6O5a6t4lruU/edit?usp=sharing

[2:42] 
Readme: https://github.com/ga-students/WDI_DTLA_9/blob/master/work/w01/d02/css-basics/css-selector-basics.md

hannah howard [2:51 PM] 
https://github.com/ga-students/WDI_DTLA_9/blob/master/work/w01/d02/css-basics/css-selector-basics.md

[2:51] 
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference

Mozilla Developer Network
CSS reference
This CSS Reference lists all standard CSS properties, pseudo-classes and pseudo-elements, @-rules, units, and selectors in alphabetic order. It not only lists the CSS 1 and CSS 2.1 properties, but also is a CSS3 reference that links to any CSS3 property and concept standardized, or already stabilized.

hannah howard [4:45 PM] 
https://github.com/ga-students/WDI_DTLA_9/tree/master/work/w01/d02/puplove_lab

Jude Molke [4:59 PM] 
@channel: DTLA Campus Ice Cream Social tonight at 6pm! Free ice cream :simple_smile:

Jack Stein [5:24 PM] 
@channel hey WDI 9, I'll be your TA tonight - I'm in the blue shirt in the back. Looking forward to working with you all!

Max Cherkasskikh [8:51 PM] 
does anyone remember? what's the syntax to connecting the html page to the css page?

Noah Flick [9:10 PM] 
<link rel="stylesheet" type="text/css" href="css/style.css"> assuming  the css file is in directory "css" which is in the same directory as your html file. Also this tag should be in the head ...uh ... area of the html.

[9:15] 
*should be in the <head> element

Max Cherkasskikh [9:16 PM] 
great. thanks Noah!

[9:16] 
just to be sure... ur saying that (as long as the css file is in the right folder) this syntax should work???

Noah Flick [10:06 PM] 
Yeah make sure href refers to the correct location/name of your css file

Max Cherkasskikh [10:32 PM] 
when you are saying correct location do you mean the name and the folder that it's in??? so like in ur example it's css (is the name of the folder) and the style (is the name of the file) and the / in between them denoting the path???


----- March 9th -----
Noah Flick [6:00 AM] 
Yes
1  

hannah howard [9:33 AM] 
https://github.com/ga-students/WDI_DTLA_9/blob/master/work/w01/d03/github_card/README.md

Max Cherkasskikh [11:29 AM] 
I went back to our GitHub card assignment and decided to be a bit creative.

I decided that among other things I want a date & clock counter so that the person seeing my card can see the current date and time.

So I googled the syntax for inserting one and found the syntax for it. The original google page where I found this is: http://www.ricocheting.com/code/javascript/html-generator/date-time-clock

I started by creating a <div> and setting a Time_Date class for it (so that I can later affect its appearance.

Than I went and generated code in the above google link and pasted it right into the Time_Date div.

The following code was generated for me by the google website:

<script type="text/javascript">
tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

function GetClock(){
var d=new Date();
var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear();
if(nyear<1000) nyear+=1900;
var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;

if(nhour==0){ap=" AM";nhour=12;}
else if(nhour<12){ap=" AM";}
else if(nhour==12){ap=" PM";}
else if(nhour>12){ap=" PM";nhour-=12;}

if(nmin<=9) nmin="0"+nmin;
if(nsec<=9) nsec="0"+nsec;

document.getElementById('clockbox').innerHTML=""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+":"+nsec+ap+"";
}

window.onload=function(){
GetClock();
setInterval(GetClock,1000);
}
</script>
<div id="clockbox"></div>

Feel free to use this code (if you want it to look the exact same way it appears for me or generate your own version at the google link.

hannah howard [11:33 AM] 
https://docs.google.com/presentation/d/1Xcapnw1QzbRggAyRcoAh30WOU1J7HCtVUR4fndkfFZA/edit?usp=sharing

[11:35] 
https://github.com/ga-students/WDI_DTLA_9/blob/master/work/w01/d03/css_positioning_box_model/README.md

Grant Roy [2:07 PM] 
@group I have added another markdown in the repo for today, that contains a lot of the information we went over today for the git lesson.

Kedar Iyer [2:34 PM] 
@channel: https://presentations.generalassemb.ly/fa5d2b95f64052a848b4#/

[2:34] 
Slides for the Intro to Javascript lesson

Kedar Iyer [3:53 PM] 
answer1 = (-b + Math.sqrt(b*b - 4*a*c)) / (2*a)
answer2 = (-b - Math.sqrt(b*b - 4*a*c)) / (2*a)

Kedar Iyer [4:34 PM] 
@channel: slides for Javascript Data Types
https://presentations.generalassemb.ly/c1e808f8c7e0285470cf#/

Kedar Iyer [5:22 PM] 
https://github.com/ga-students/WDI_DTLA_9/blob/master/work/w01/d03/functions-hw.md

[5:22] 
HW is up

Kedar Iyer [5:30 PM] 
https://github.com/ga-students/WDI_DTLA_9/blob/master/work/w01/d02/intro_html_markdown/html5-boilerplate.html


----- March 10th -----
Grant Roy [9:01 AM] 
added and commented on a Markdown (raw) snippet: js-exercises-1 
##Exercises
​
### 1) Find the first 20 numbers of the Fibonacci Sequence. 
​
* The first two numbers of the Fibonacci Sequence are 1 and 2. Each subsequent number is the sum of the previous two. 
  1 Comment Click to expand inline 25 lines
  @group morning exercise

Jobeth Pauline Zapata [10:14 AM] 
Good morning!:smiley:
3  

AJ Almaguer [10:28 AM] 
anyone else get this? 
var bycycle = {
 numGears: 6,
 getGears: function {
   return bycycle.numGears
 }
}

Grant Roy [11:30 AM] 
added and commented on a JavaScript/JSON snippet: js-exercises.js 
// JavaScript Review Lab
//   Working as a team, replace the null values
//    with JavaScript that completes the task.
//
// For each challenge, copy and paste it into
1 Comment Click to expand inline 319 lines
@group: Lab

AJ Almaguer [11:38 AM] 
I was playing around with adding things to arrays during the last exercise. Here’s the repl.it link: https://repl.it/BuyR/6
repl.it
Run code in a variety of languages from your browser! (3KB)

Max Cherkasskikh [2:41 PM] 
Class, here's the var that we were mulling over right after lunch:

var turkey = {

        Clothes: “Feathers”
            Feet: 2
            Beak: true
                getClothes: function();
                    return (this.clothes);
}

console.log(turkey.clothes)

console.log(turkey.get(clothes())

Kedar Iyer [4:26 PM] 
https://calm-wave-22329.herokuapp.com/

[4:26] 
this is a buzzer website

[4:26] 
I’ll be able to see it on my computer everytime you hit the buzz button

hannah howard [5:34 PM] 
Presentation: https://docs.google.com/presentation/d/1KdY6aWC4htjyjegkMLRP4WRHQCmAwxno6aIET3xybJ4/edit?usp=sharing

[5:36] 
Markdown for today: https://github.com/ga-students/WDI_DTLA_9/tree/master/work/w01/d04/js_control_flow

[5:38] 
Homewor: https://github.com/ga-students/WDI_DTLA_9/blob/master/work/w01/d04/talking_heads_drills/main.js

AJ Almaguer [6:52 PM] 
eloquent javascript book http://eloquentjavascript.net/
2  


----- March 11th -----
Kedar Iyer [9:24 AM] 
You can push multiple values like arr.push(2,3)

[9:24] 
Test it in your console to see it work

Carlos Borges [9:34 AM] 
var band = {
 name: "Talking Heads",
 members: ["David Byrne"],
 albums: talkingHeadsAlbums[],
}

Kedar Iyer [9:35 AM] 
added a JavaScript/JSON snippet: Removing commas with split and map 
var str = "My name is Hannah, and I'm tired today"
var splitNoCommas = str.split(" ").map(function (item) {
	return item.replace(",", "")
})
// splitNoCommas = [ 'My', 'name', 'is', 'Hannah', 'and', 'I\'m', 'tired', 'today' ]
Add Comment
AJ Almaguer [9:39 AM] 
added a Plain Text snippet 
if(talkingHeadsAlbums.length >= 6) {
  console.log("Talking Heads were a prolific band")
} else {
  console.log("Talking heads didn't have much output.")
}
Add Comment
Jonathan Dai [9:40 AM] 
2.if (talkingHeadsAlbums.length%2==0) {
 console.log("The number talkingHeadsAlbums.length is even")
}
else if (talkingHeadsAlbums.length%2!==0) {
 console.log("The number talkingHeadsAlbums.length is odd")
}

Noah Flick [9:44 AM] 
// 4.3
var albumsNum =talkingHeadsAlbums.length

if(albumsNum % 6 == 0)
 console.log("The number " + albumsNum + " is divisible by 2 and 3")
else if (albumsNum % 2 == 0)
 console.log("The number " + albumsNum + " is divisible by 2")
else if (albumsNum % 3 == 0)
 console.log("The number " + albumsNum + " is divisible by 3")
else console.log("The number " + albumsNum + " is not divisible by 2 or 3")

AJ Almaguer [9:49 AM] 
added a Plain Text snippet 
console.log("afterhours.js linked!");
////////////////////////////////////////////////
// Part 1: Linking
////////////////////////////////////////////////
Add Comment Click to expand inline 356 lines
Kedar Iyer [9:50 AM] 
https://nyobetabeat.files.wordpress.com/2012/04/ballmer_peak.png?w=600&h=544 (97KB)
1  

[9:52] 
it’s called the Ballmer peak after Steve Ballmer

hannah howard [10:42 AM] 
Just a couple resources to help your learning… 
https://github.com/ga-students/WDI_DTLA_9/blob/master/resources/cheatsheets/dom_js_cheatsheet.md
http://tutorialzine.com/2014/06/10-tips-for-writing-javascript-without-jquery
https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
https://christianheilmann.com/stuff/JavaScript-DOM-Cheatsheet.pdf
https://en.wikipedia.org/wiki/DOM_events

Jude Molke [11:09 AM] 
set the channel purpose: Here is a link to your public class calendar where you will find Outcomes Program scheduling, Speakers & Panels, and any social events for your class.  https://calendar.google.com/calendar/embed?src=generalassemb.ly_enmm072qght66hp34nlhjn2cv8%40group

Carlos Allende [1:57 PM] 
@channel: just in case you guys want to take a closer look to the calculator https://github.com/vanpeta/calculator

GitHub
vanpeta/calculator
Contribute to calculator development by creating an account on GitHub.
1  

hannah howard [2:33 PM] 
Lesson Markdown: https://github.com/ga-students/WDI_DTLA_9/tree/master/work/w01/d05/js_dom_manipulation

[2:36] 
https://docs.google.com/presentation/d/1EYabHrXWXhtm8-88_xwV46tQmk_zJTotYuLPVOLIYgQ/edit?usp=sharing

Jude Molke [3:53 PM] 
@channel: Happy Hour starts at 4:30! There will be 3 Immersive classes there today (WDI 9, WDI 8, UXDI), so be sure to introduce yourselves and mingle, since you’re the new kids on campus!

Kedar Iyer [3:58 PM] 
@channel tic tac toe HW

[3:58] 
https://github.com/ga-students/WDI_DTLA_9/blob/master/work/w01/d05/tic_tac_toe_weekend.md

Marcos Felix [4:30 PM] 
added and commented on a Plain Text snippet 
<!DOCTYPE html>
<html>
<head>
  <title></title>
1 Comment Click to expand inline 90 lines
just HTML, CSS NOT INCLUDED

Kedar Iyer [4:33 PM] 
and here’s Carlos’s group’s solution on Github: https://github.com/vanpeta/calculator/blob/master/calculator.html

GitHub
vanpeta/calculator
Contribute to calculator development by creating an account on GitHub.

Kedar Iyer [4:34 PM] 
shared Jeffrey Tunches' HTML snippet: calculator-starter.html 

Kedar Iyer [4:35 PM] 
https://github.com/ga-students/WDI_DTLA_9/blob/master/work/w01/d05/calculator_solutions/joseph_calc.html
1  

[4:35] 
that’s the link to Joseph’s group’s solution


----- March 12th -----
Max Cherkasskikh [3:20 PM] 
@channel: Dumb question... If we already attached a css file and a js file to our html file do we need to create the <script></script> tags inside the html file or should we just go to the js file to work with all our javascript and it will automatically affect all of our html and css files?

Jeffrey Tunches [3:20 PM] 
link

[3:20] 
just a sec

[3:21] 
based on your naming and DOM

[3:21] 
<link rel="stylesheet" href="css/style.css">

[3:22] 
href="css/style.css”

[3:22] 
css is the folder in this case and style.css the file

[3:24] 
if you want them externally

Carlos Allende [3:25 PM] 
@maxcherkasskikh if the links to the .css and .js work, editing those files will affect the html (edited)

Jeffrey Tunches [3:26 PM] 
as for <script></script> i think they are safe to remove if anyone can confirm

[3:26] 
in the html file Max was mentioning

Max Cherkasskikh [3:45 PM] 
yeah. i got the links all lined up. technically speaking i haven't tested them. but i think i got the right links as mentioned by jeffrey. so i guess i don't have to put the <script> tag in the html.

[3:45] 
thanks guys!

Max Cherkasskikh [5:55 PM] 
if u guys remember... what was the cheat to opening up a chrome browser and typing something into the console to see all the block borders?

Max Cherkasskikh [6:18 PM] 
correction: found the cheat. it was in the CSS boxes presentation, third slide (if anyone needs to look it up)

Max Cherkasskikh [7:35 PM] 
damn it. been banging my head against the wall on this one.

anyone know what the css syntax is for aligning the boxes in a line?

[7:35] 
anything I try it just doesn't work.

[7:36] 
for instance. this is my html code for my boxes:

<div id='row_1'>
     <div id='block_1'><button> </button></div>
     <div id='block_2'><button> </button></div>
     <div id='block_3'><button> </button></div>
   </div>

[7:37] 
all i wanna do is line the three buttons in a horizontal line.

[7:37] 
what am I doing wrong here??????

Jobeth Pauline Zapata [8:01 PM] 
try margin?..... not sure :thinking_face:

Max Cherkasskikh [8:11 PM] 
all margin does is affect the margin of each button (which is useful) but not pertinent to lining up boxes. the margin did increase. but it still didn't make my button line up horizontally

[8:11] 
@channel: anyone else care to chime in on this?

Trevor Pham [8:37 PM] 
try float

Andrew Gibbs [8:41 PM] 
horizontal alignment of the divs i used css display: inline-block

Max Cherkasskikh [8:47 PM] 
float did move some of the button id's but there's only two properties. left and right. how do i squeeze three of them.

[8:48] 
@gibster: tried that. it didn't do anything

Andrew Gibbs [8:52 PM] 
are you applying the style to the div contating the 3 divs

[8:52] 
the style applied to row_1

Max Cherkasskikh [8:56 PM] 
yes. this is my css:

#row_1 {
 display: block;
}

Max Cherkasskikh [9:10 PM] 
@hannah.howard: and @kedariyer can u help out a brother?

[9:11] 
can't get this thing to work

Max Cherkasskikh [10:00 PM] 
@channel

[10:00] 
I am truly at a loss of words. i just can't get the damn thing to behave in line no matter what i do

Andrew Gibbs [10:06 PM] 
You are missing the Inline 
display: inline-block;

Max Cherkasskikh [10:13 PM] 
i tried that. i'm about ready to throw stuff in the room

[10:13] 
at the moment this is what i have:

#row_1 {
 display: inline-block;
}

#block_1 {
 size: 33%;
}
#block_2 {
 size: 33%;
}
#block_3 {
 size: 33%;

AJ Almaguer [11:04 PM] 
hey @maxcherkasskikh try using the float and clear properties

[11:04] 
https://developer.mozilla.org/en-US/docs/Web/CSS/float

Mozilla Developer Network
float
The float CSS property specifies that an element should be taken from the normal flow and placed along the left or right side of its container, where text and inline elements will wrap around it.

[11:04] 
https://developer.mozilla.org/en-US/docs/Web/CSS/clear

Mozilla Developer Network
clear
The clear CSS property specifies whether an element can be next to floating elements that precede it or must be moved down (cleared) below them. The clear property applies to both floating and non-floating elements.

[11:04] 
i suggest typing out the examples on those pages into your own test file so that you can understand how to use them.

AJ Almaguer [11:25 PM] 
@maxcherkasskikh: remember that tip hannah gave us about putting red boxes around our elements w/ css. It’s a useful debugging too. 
border: red 1px solid


----- March 13th -----
Max Cherkasskikh [12:27 AM] 
yeah. i found out how to do the red box thing. been using it all day. problem is that when the code is wrong (something i must be doing unintentionally) than no amount of red boxes can fix that. I've tried inline, block, inline-block and i tried the float methods and none of them have worked. some of them had worked but not the way i expected them to. all i want is for the three div blocks to line up horizontally. is that too much to ask for??? :simple_smile: hahahahahaha...

Max Cherkasskikh [12:47 AM] 
hahahahahahahahahahahahahah...

ok... for anyone struggling with this (i hope i wasn't the only one):

this is what u do.

u create a div for the horizontal block, within that div you create three children divs and u id them all accordingly. when you go to the CSS file u call up the id for the parent div. once u called that up type in the following value:

display: flex;

that is all you have to do. I spent nearly the whole day (while doing other things) trying to get this damn thing to work the way i needed it to. and within a second by changing one word made it work.

ur welcome :simple_smile: (edited)

Max Cherkasskikh [12:49 AM] 
added a Plain Text snippet 
the following was my css:
#row_1 {
  display: flex;
}
Add Comment Click to expand inline 15 lines
Max Cherkasskikh [12:50 AM] 
and i did this three times.

[12:50] 
and it created a square block 3 x 3

Max Cherkasskikh [3:59 AM] 
for those of u that care to poke around a little more on flex:

[3:59] 
https://css-tricks.com/snippets/css/a-guide-to-flexbox/

CSS-Tricks
A Complete Guide to Flexbox | CSS-Tricks
Background The Flexbox Layout (Flexible Box) module (currently a W3C Last Call Working Draft) aims at providing a more efficient way to lay out, align and

Kedar Iyer [1:06 PM] 
@maxcherkasskikh: I’m glad you figured it out. In order to get the display: inline-block CSS property to work you would have to set them on the block elements, not on the parent row

Jack Stein [1:45 PM] 
hey @channel - just wanted to reiterate that many students in my cohort (myself included) found the Javascript CodeAcademy track really helpful - highly recommended!

https://www.codecademy.com/learn/javascript
Codecademy
JavaScript
Codecademy is the easiest way to learn how to code. It's interactive, fun, and you can do it with your friends.
1  

Chad Rutherford [1:46 PM] 
@channel: Also would like to add that this book is really helpful: http://eloquentjavascript.net/
1  

Max Cherkasskikh [2:05 PM] 
@kedariyer: I guess there's a number of ways to do things.

I wanted to have more control.

But more than anything was doing things the way they made sense to me at the moment.

Just glad I got that break through. Cause after that things just kept on coming to me


----- Yesterday March 14th, 2016 -----
Kedar Iyer [9:12 AM] 
@channel: Code wars Challenge

[9:12] 
http://www.codewars.com/kata/days-in-the-year

[9:15] 
A more challenging one if you get the first one quickly

[9:15] 
http://www.codewars.com/kata/white-or-black

Marcos Felix [9:52 AM] 
function yearDays(year)
{
var days = 365
  if (year % 4 === 0) 
     days = 366
  if (year % 100 === 0 && year % 400 !== 0 )
      days = 365
return year + ' has ' + days + ' days'

}

hannah howard [10:29 AM] 
some thoughts on tic tac toe win-logic: there are essentially three types of wins in tic tac toe — horizontal rows, vertical columns, and diagonals. For checking wins, it’s helpful to divide up the task to check each of these cases separately.

[10:33] 
the simplest case of checking for a tie is: if the board is completely filled out and no one has one, it’s a tie. a more complicated case is determining that no possible wins are left before the board is fully filled out.

Kedar Iyer [11:33 AM] 
@channel: https://presentations.generalassemb.ly/e7fb3e94983550c177f4#/

[11:33] 
Slides for the pseudocode lesson

Max Cherkasskikh [12:18 PM] 
uploaded an image: Slack for iOS Upload 
Add Comment
Max Cherkasskikh [12:18 PM] 
uploaded an image: Slack for iOS Upload 
Add Comment
Max Cherkasskikh [12:27 PM] 
uploaded an image: Slack for iOS Upload 
Add Comment
Max Cherkasskikh [2:30 PM] 
uploaded an image: Slack for iOS Upload 
Add Comment
Andrew Gibbs [2:31 PM] 
http://codepen.io/pen/     write html css and html all in one and check it live
CodePen
A Pen by  Captain Anonymous
... (12KB)
1  

Max Cherkasskikh [2:37 PM] 
uploaded an image: Slack for iOS Upload 
Add Comment
hannah howard [2:39 PM] 
https://docs.google.com/a/generalassemb.ly/presentation/d/1UGTxBULeCP0x0MdieKUlxp-eI5pcxs6zfIionHAYUB4/edit?usp=sharing

[2:39] 
presentation

[2:39] 
markdown

[2:40] 
https://github.com/ga-students/WDI_DTLA_9/blob/master/work/w02/d01/js_callbacks/js_callbacks.md

Kedar Iyer [3:34 PM] 
I’ve added the pseudocode Javascript translation to the lesson slides here: https://presentations.generalassemb.ly/e7fb3e94983550c177f4#/4

hannah howard [4:05 PM] 
https://github.com/ga-students/WDI_DTLA_9/tree/master/work/w02/d01/js-callbacks-lab

Kedar Iyer [5:21 PM] 
added a Plain Text snippet: Standup Groups Week 2 
Group 1 (Javascript Jedis)
['Joseph', 'Trevor', 'Martin', 'Noah']
Group 2 (Carlton's Callbacks)
['Jobeth', 'AJ', 'Carlos B.', 'Arvin']
Add Comment Click to expand inline 11 lines
Kedar Iyer [5:22 PM] 
@channel standup groups

Noah Flick [5:38 PM] 
couple other resources for callbacks, etc.:
http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/
http://eloquentjavascript.net/05_higher_order.html  - I know this text has been sent before but doing the exercises helped  me wrap my mind (partially) around higher order functions...

JavaScript is Sexy
Understand JavaScript Callback Functions and Use Them
(Learn JavaScript Higher-order Functions, aka Callback Functions) In JavaScript, functions are first-class objects; that is, functions are of the type Object and they can be used in a first-class m...

Max Cherkasskikh [8:21 PM] 
@kedariyer @hannah.howard @grant

If u see this before tomorrow (Tuesday) and u have a minute and u r willing to check out my code can u please tell me what am I doing wrong in the code (html or javascript) in terms of the blocks working properly.

fair warning: i did watch a video that most of the class found on YouTube on creating a Tic Tac Toe game and followed the javascript portion fairly closely. in my defense... i'm still struggling with javascript and the video definitely helped understand things just a little better.

below r the html, css, javascript snippets to all my code.

Max Cherkasskikh [8:22 PM] 
added a Plain Text snippet: HTML 
<!DOCTYPE html>
<html lang="en">
<head>
Add Comment Click to expand inline 97 lines
Max Cherkasskikh [8:22 PM] 
added a Plain Text snippet: CSS 
* {
  }
  .body {
  Add Comment Click to expand inline 197 lines
  Max Cherkasskikh [8:23 PM] 
  added a Plain Text snippet: JAVASCRIPT 
  document.getElementById('lets-play_button').addEventListener('click' , function (event) {
  document.getElementById('major_block').style.display = 'flex'
  })
  document.getElementById('lets-play_button').addEventListener('click' , function (event) {
  Add Comment Click to expand inline 99 lines
  Joseph Del Castillo [10:15 PM] 
  uploaded and commented on a file 
  wdi_coursecurriculum_v2.0.pdf
  483KB
  PDF
  Click to open original
  1 Comment
  Hello all! Here is the curriculum mentioned today.


----- Today March 15th, 2016 -----
Kedar Iyer [10:19 AM] 
http://k26dr.github.io/tic-tac-toe-wdi9/

[10:19] 
Github Pages link

Kedar Iyer [10:25 AM] 
HTML boilerplate: https://github.com/ga-students/WDI_DTLA_9/blob/master/work/w01/d02/intro_html_markdown/html5-boilerplate.html

AJ Almaguer [12:42 PM] 
Multiple identical event listeners

If multiple identical EventListeners are registered on the same EventTarget with the same parameters, the duplicate instances are discarded. They do not cause the EventListener to be called twice, and they do not need to be removed manually with the removeEventListener method.

[12:42] 
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

Mozilla Developer Network
EventTarget.addEventListener()
The EventTarget.addEventListener() method registers the specified listener on the EventTarget it's called on. The event target may be an Element in a document, the Document itself, a Window, or any other object that supports events (such as XMLHttpRequest).

hannah howard [2:33 PM] 
https://docs.google.com/presentation/d/18nxUUitt1NjTKgYS-VQZPgs9W7mvJtFCdYVXnoSPp0s/edit?usp=sharing

[2:33] 
Presentation

hannah howard [3:38 PM] 
uploaded an image: Screen Shot 2016-03-15 at 3.37.25 PM.png 
Add Comment
Max Cherkasskikh [8:14 PM] 
Can anyone (who knows) layout the steps to git committing your project and finding the link to making the tic tac toe game operate outside of the sublime application like having someone else being able to see it online (basically publishing it). Kedar mentioned it today.


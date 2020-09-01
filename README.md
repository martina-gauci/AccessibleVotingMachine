# Voting Machine for People with Disabilities  

This repository consists of the dissertation, the designs and the code created for my final year project while reading for a Bachelors Degree in Software Development.  A review paper has been included to give a quick overview of the project.

## Project Description

This study’s aim was to create an interface for a voting machine located at the polling station which will allow citizens with disabilities to vote unassisted. A participatory design process, which includes the target audience and experts in accessibility, was used to ensure the accessibility of the artefacts. An iterative approach was taken where the designs were refined into more usable and accessible prototypes. The prototypes increased in fidelity; hence, the final prototype looks like a fully functional interface. The changes were based on feedback provided by the accessibility experts or the results of the user testing. During the user testing, the prototypes were measured in terms of effectiveness, efficiency and user satisfaction. Some issues were encountered when carrying out the user tests, therefore, the number of testers and the conditions under which the tests were held are not ideal.
Using the high-fidelity prototype, the testers were able to cast the intended vote in under five minutes. All testers were also able to make the instructed changes to the vote. All prototypes obtained a good user satisfaction score, the highest mean score being 95.4 for the final prototype. The high-fidelity prototype showed an improvement in effectiveness, efficiency and satisfaction. However, the improvement is not statistically significant. This is possibly due to the small number of participants.

## How to run the prototypes

1.	Open one of the folders in the Code folder in Visual Studio Code.
2.	In Visual Studio Code’s terminal, run npm install to download the necessary packages.
3.	Once the previous command has finished, run npm start.
a.	This will launch the web application in your browser.
4.	For ‘Mid-fidelity - Prototype A’, ‘Mid-fidelity - Prototype B’ and ‘High-fidelity – Tablet’, please view the interface through Chrome's Developer Tools and display the interface on an emulated iPad.  Otherwise, view the prototype on your tablet device by using the IP and port number displayed in Visual Code’s terminal.

The reason for the prototypes not being responsive is that these prototypes were designed for a designated voting machine which would have a standard size at all polling stations. 
 
Important: If the candidates’ names are not being displayed, click on Application (in the red box) in Chrome’s Developer Tools and delete all the variables (in the purple box).  This is because the candidates are being stored in local storage which will not be deleted unless the vote is cast. 
 

Otherwise, you can simply view the interfaces by visiting the following links:

•	https://prototype-a.netlify.app/ for ‘Mid-fidelity – Prototype A’

•	https://prototype-b.netlify.app/ for ‘Mid-fidelity – Prototype B’

•	https://accessible-voting.netlify.app/ for ‘High-fidelity – Tablet’

•	https://accessible-voting-2.netlify.app/ for ‘High-fidelity – Desktop’


const cli = {};

function getCommand(cmd) {
    let result = null;
    for (var i = 0; i < commands.length; i++){
        if (commands[i].command == cmd){
            result = commands[i];
        }
    }
    return result;
}

function getArgument(args, arg) {
    let result = null;
    for (var i = 0; i < args.length; i++){
        if (args[i].argument == arg){
            result = args[i];
        }
    }
    return result;
}

cli.execute = (cmd) => {
    let result = { success: false };
    const values = cmd.split(' ');

    if (values) {
        if (values[0] === "joke") {
            const joke = jokes[Math.floor(Math.random() * jokes.length)];
            result.success = true;
            result.output = `${joke.question}<br /><br />${joke.answer}`;
        }  else if (values[0] === "ls") {
            result.success = true;
            result.output = `<p>Hey! I am not a real OS.</p>`;
        } else if (values[0] === "cd") {
            result.success = true;
            result.output = `<p>Hey! I am not a real OS.</p>`;
        } else if (values[0] === "dir") {
            result.success = true;
            result.output = `<p>Hey! I am not a real OS.</p>`;
        } else if (values[0] === "format") {
            result.success = true;
            result.output = `<p>Disk formatting...</p><br><p>...OK! (0 bytes available)</p>`;
        }
        else {      
            let command = getCommand(values[0]);

            if (command) {
                if (values.length > 1 && command.arguments) {
                    let argument = getArgument(command.arguments, values[1]);
                    if (argument) {
                        result.success = true;
                        result.output = argument.output;
                        console.log(argument.output);
                    }
                    else {
                        result.success = false;
                    }
                } 
                else {
                    result.success = command.valid ?? true;
                    result.output = command.output;
                }
            }
            else {
                result.output = `command not found: ${cmd}`;
            }
        }
    }

    return result;
};

function init() {
    const app = document.querySelector("#app");
    const terminal = new Shell(app, cli);
    terminal.start();
}

init();

const commands = [
    {
        command: "help",
        output: "<span class='code'> \
                    about [-b | -c | -s | -n | -e]  \
                    <div class='text tab'> \
                        OPTIONS: \
                        <table class='actions'> \
                            <tr> \
                                <td>-b</td> \
                                <td>Biography, background and experience</td> \
                            </tr> \
                            <tr> \
                                <td>-c</td> \
                                <td>List contact information</td> \
                            </tr> \
                            <tr> \
                                <td>-s</td> \
                                <td>List social media accounts</td> \
                            </tr> \
                            <tr> \
                                <td>-n</td> \
                                <td>Last news and highlights</td> \
                            </tr> \
                            <tr> \
                                <td>-e</td> \
                                <td>Education</td> \
                            </tr> \
                        </table> \
                    </div> \
                </span> \
                <span class='code'> \
                    info [-c | -r | -p | -a | -b | -t | -e | -v]  \
                    <div class='text tab'> \
                        OPTIONS: <br /> \
                        <table class='actions'> \
                            <tr> \
                                <td>-c</td> \
                                <td>Courses</td> \
                            </tr> \
                            <tr> \
                                <td>-r</td> \
                                <td>Research interests</td> \
                            </tr> \
                            <tr> \
                                <td>-p</td> \
                                <td>Projects</td> \
                            </tr> \
                            <tr> \
                                <td>-a</td> \
                                <td>Associations</td> \
                            </tr> \
                            <tr> \
                                <td>-b</td> \
                                <td>Publications</td> \
                            </tr> \
                            <tr> \
                                <td>-t</td> \
                                <td>Tools</td> \
                            </tr> \
                            <tr> \
                                <td>-e</td> \
                                <td>Events</td> \
                            </tr> \
                            <tr> \
                                <td>-v</td> \
                                <td>Short CV</td> \
                            </tr> \
                        </table> \
                    </div> \
                </span> \
                <span class='code'> \
                    clear \
                    <div class='text tab bottom-8'> \
                        Clear the terminal output \
                    </div> \
                </span> \
                <span class='code'> \
                    help \
                    <div class='text tab'> \
                        List all commands \
                    </div> \
                </span> \
                "
    },
    {
        command: "about",
        valid: false,
        output: "invalid command, must supply argument",
        arguments: [
            {
                argument: "-b",
                output: " \
                            <div class='output'> \
                                <span class='bg-green'>CURRENT LOCATION</span> \
                                <p>Bari, Italy</p> \
                                <span class='bg-green'>CURRENT ROLE</span> \
                                <p>Associate Professor at the University of Bari Aldo Moro</p> \
                                <span class='bg-green'>BIOGRAPHY & BACKGROUND</span> \
                                <p>Pierpaolo Basile is an Associate Professor at the University of Bari, Italy.<br> \
                                His expertise is in Natural Language Processing, in particular, in Semantics.<br> \
                                Since 2005, his research has been on methods for understanding natural language.<br> \
                                He is also CEO of AI2B (a spin-off of the University of Bari) and co-founder of QuestionCube.</p> \
                                <span class='bg-green'>EXPERIENCE</span> \
                                <table class='output auto bordered collapsed padded'> \
                                    <tr> \
                                        <td></td> \
                                        <td># Programming</td> \
                                        <td># Research</td> \
                                        <td># Teaching</td> \
                                    </tr> \
                                    <tr> \
                                        <td># YEARS</td> \
                                        <td>35+</td> \
                                        <td>19+</td> \
                                        <td>15+</td> \
                                    </tr> \
                                </table> \
                            </div> \
                        "
            },
            {
                argument: "-c",
                output: "<table class='output auto bordered collapsed padded'> \
                            <tr> \
                                <td>Personal email:</td> \
                                <td>HIDDEN</td> \
                            </tr> \
                            <tr> \
                                <td>Work email:</td> \
                                <td><a href='mailto:pierpaolo.basile@uniba.it' target='_blank'>pierpaolo.basile@uniba.it <i class='fas fa-external-link-alt'></i></td> \
                            </tr> \
                        </table>"
            },
            {
                argument: "-s",
                output: "<table class='output auto bordered collapsed padded'> \
                            <tr> \
                                <td>LinkedIn:</td> \
                                <td><a href='https://www.linkedin.com/in/pierpaolobasile' target='_blank'>linkedin.com/in/pierpaolobasile <i class='fas fa-external-link-alt'></i></td> \
                            </tr> \
                            <tr> \
                                <td>GitHub:</td> \
                                <td><a href='https://github.com/pippokill' target='_blank'>@pippokill <i class='fas fa-external-link-alt'></i></td> \
                            </tr> \
                            <tr> \
                                <td>Twitter:</td> \
                                <td><a href='https://www.twitter.com/basilepp' target='_blank'>@basilepp <i class='fas fa-external-link-alt'></i></td> \
                            </tr> \
                        </table>"
            },
            {
                argument: "-n",
                output: "<table class='output auto bordered collapsed padded'> \
                            <tr> \
                                <td>Advanced Natural-based interaction for the ITAlian language: LLaMAntino-3-ANITA. (<a href='https://arxiv.org/pdf/2405.07101' target='_blank'>paper</a>, <a href='https://huggingface.co/swap-uniba/LLaMAntino-3-ANITA-8B-Inst-DPO-ITA' target='_blank'>Hugging Face</a>)</td> \
                            </tr> \
                            <tr> \
                                <td><a href='https://clic2024.ilc.cnr.it/calamita/' target='_blank'>CALAMITA</a>: Challenge the Abilities of LAnguage Models in ITAlian</td> \
                            </tr> \
                            <tr> \
                                <td>LLaMAntino: LLaMA 2 models for effective text generation in Italian language. (<a href='https://arxiv.org/pdf/2312.09993' target='_blank'>paper</a>, <a href='https://huggingface.co/collections/swap-uniba/llamantino-models-65aa9f3357f263e3d0402346' target='_blank'>Hugging Face</a>)</td> \
                            </tr> \
                        </table>"
            },
            {
                argument: "-e",
                output: "<table class='output auto bordered collapsed padded'> \
                            <tr> \
                                <td><span class='bg-green'>Ph.D. in Computer Science, University of Bari Aldo Moro</span></td> \
                                <td>Ph.D. in Computer Science. Thesis title :“Word Sense Disambiguation and Intelligent Information Access”, Advisor: Professor Giovanni Semeraro.</td> \
                            </tr> \
                            <tr> \
                                <td><span class='bg-green'>Master degree in Computer Science</span></td> \
                                <td>Master degree in Computer Science. Thesis title: “JIGSAW: un algoritmo di disambiguazione diversificato per ogni categoria grammaticale” (JIGSAW: a word sense disambiguation algorithm with different approaches for each part-of-speech), Supervisor: Professor Giovanni Semeraro.</td> \
                            </tr> \
                        </table>"
            }
        ]
    },
    {
        command: "info",
        valid: false,
        output: "invalid command, must supply argument",
        arguments: [
            {
                argument: "-c",
                output: "<div class='output'> \
                            <p><span class='bg-green'>CURRENT COURSES</span></p> \ \
                            <ul class='output dash'> \
                                <li>Laboratorio di Informatica (starting A.A. 2024/2025)</li> \
                                <li>Sviluppo di Videogiochi - Laurea Triennale in Informatica</li> \
                                <li>Metodi Avanzati di Programmazione (M-Z) - Laurea Triennale in Informatica</li> \
                                <li>Natural Language Processing - Master in Computer Science</li> \
                            </ul> \
                        </div> \
                        "
            },
            {
                argument: "-r",
                output: "<div class='output'> \
                            <span class='bg-green'RESEARCH INTERESTS</span> \
                            <p>Natural Language Processing</p> \
                            <ul class='output dash'> \
                                <li>Large Language Models</li> \
                                <li>Word Sense Disambiguation and Entity Linking</li> \
                                <li>Distributional Semantic Models and Compositional Semantics</li> \
                                <li>Statistical Methods for Natural Language Processing</li> \
                                <li>Diachronic Analysis of Language</li> \
                            </ul> \
                            <br> \
                            <p>Intelligent Information Access</p> \
                            <ul class='output dash'> \
                                <li>Natural Language Processing for Information Retrieval</li> \
                                <li>Information Filtering</li> \
                                <li>Recommender Systems</li> \
                                <li>Machine Learning Techniques for Recommender Systems</li> \
                            </ul> \
                        </div> \
                        "
            },
            {
                argument: "-p",
                output: "<div class='output'> \
                            <p><span class='bg-green'>PROJECTS</span></p> \
                            <ul class='output dash'> \
                                <li><a href='https://fondazione-fair.it/en/' target='_blank'>FAIR - Future Artificial Intelligence Research project <i class='fas fa-external-link-alt'></i> - Spoke 6 \"Symbiotic AI\"</li> \
                            </ul> \
                        </div>" 
            },
            {
                argument: "-a",
                output: "<div class='output'> \
                            <p><span class='bg-green'>ASSOCIATION</span></p> \
                            <ul class='output dash'> \
                                <li><a href='https://www.ai-lc.it/en/' target='_blank'>AILC <i class='fas fa-external-link-alt'></i></a> (Associazione Italiana di Linguistica Computazionale): board member and secretary</li> \
                                <li><a href='https://aixia.it/' target='_blank'>AIIA <i class='fas fa-external-link-alt'></i></a> (Associazione Italiana per l’Intelligenza Artificiale): board member</li> \
                            </ul> \
                        </div> \
                        "
            },
            {
                argument: "-b",
                output: "<div class='output'> \
                            <p><span class='bg-green'>PUBLICATIONS</span></p> \
                            <table class='output auto bordered collapsed padded actions'> \
                                <tr> \
                                    <td><a href='https://scholar.google.it/citations?hl=it&pli=1&user=dNznumkAAAAJ' target='_blank'>Google Scholar Profile <i class='fas fa-external-link-alt'></i></td> \
                                </tr> \
                                <tr> \
                                    <td><a href='https://orcid.org/0000-0002-0545-1105' target='_blank'>ORCID <i class='fas fa-external-link-alt'></i></td> \
                                </tr> \
                                <tr> \
                                    <td><a href='https://dblp.org/pid/98/5082.html' target='_blank'>DBDL <i class='fas fa-external-link-alt'></i></td> \
                                </tr> \
                                <tr> \
                                    <td><a href='https://dl.acm.org/profile/81384607416' target='_blank'>ACM Digital Library <i class='fas fa-external-link-alt'></i></td> \
                                </tr> \
                                <tr> \
                                    <td><a href='https://aclanthology.org/people/p/pierpaolo-basile/' target='_blank'>ACL Anthology <i class='fas fa-external-link-alt'></i></td> \
                                </tr> \
                            </table> \
                        </div>"
            },
            {
                argument: "-t",
                output: "<div class='output'> \
                           <p><span class='bg-green'>TOOLS</span></p> \
                            <ul class='output dash'> \
                                <li>Temporal Random Indexing (<a href='https://github.com/pippokill/tri' target='_blank'>GitHub <i class='fas fa-external-link-alt'></i></a>)</li> \
                                <li>Extending and Information Retrieval System through Time Event Extraction (<a href='https://github.com/pippokill/TAIR' target='_blank'>GitHub <i class='fas fa-external-link-alt'></i></a>)</li> \
                                <li>An Enhanced Lesk Word Sense Disambiguation algorithm through a Distributional Semantic Model (<a href='https://github.com/pippokill/lesk-wsd-dsm' target='_blank'>GitHub <i class='fas fa-external-link-alt'></i></a>)</li> \
                                <li>UNIBA: JIGSAW algorithm for Word Sense Disambiguation (<a href='https://github.com/pippokill/JIGSAW' target='_blank'>GitHub <i class='fas fa-external-link-alt'></i></a>)</li> \
                            </ul> \
                        </div> \
                        "
            },
            {
                argument: "-e",
                output: "<div class='output'> \
                            <p><span class='bg-green'>EVENTS</span></p> \
                            <ul class='output dash'> \
                                <li><span class='bg-green'>NL4AI 2020 co-chairs:</span> 4th Workshop on Natural Language for Artificial Intelligence</li> \
                                <li><span class='bg-green'>Sponsorship chair:</span> Sesta Conferenza Italiana di Linguistica Computazionale (CLiC-it 2019)</i></a></li> \
                                <li><span class='bg-green'>Local co-organizer:</span> Sesta Conferenza Italiana di Linguistica Computazionale (CLiC-it 2019)</li> \
                                <li><span class='bg-green'>EVALITA 2018, iLISTEN task co-organizer:</span> the first itaLIan Speech acT labEliNg task at EVALITA18</li> \
                                <li><span class='bg-green'>EVALITA 2018, ABSITA task co-organizer:</span> Aspect-based Sentiment Analysis at EVALITA</li> \
                                <li><span class='bg-green'>EVALITA 2018, NLP4FUN task co-organizer:</span> Solving language games at EVALITA18</li> \
                                <li><span class='bg-green'>RECOVER 2018 co-chairs:</span> Workshop on REbooting the COnVErsational Recommender Systems at RecSys 2018</li> \
                                <li><span class='bg-green'>NL4AI 2018 co-chairs:</span> 2nd Workshop on Natural Language for Artificial Intelligence</li> \
                                <li><span class='bg-green'>NL4AI 2017 co-chairs:</span> 1st Workshop on Natural Language for Artificial Intelligence</li> \
                                <li><span class='bg-green'>TDDL 2017 co-chairs:</span> 1st Workshop on Temporal Dynamics in Digital Libraries</li> \
                                <li><span class='bg-green'>EVALITA 2016 co-chairs:</span> Evaluation of NLP and Speech Tools for Italian</li> \
                                <li><span class='bg-green'>IIR2012 local-organizer:</span> Third Italian Information Retrieval Workshop - IIR2012 Bari, Italy</li> \
                                <li><span class='bg-green'>IIA 2008 local-organizer:</span> Intelligent Information Access (IIA) 2008, Cagliari</li> \
                                <li><span class='bg-green'>SWAP 2007 local-organizer:</span> 4th Workshop on Semantic Web Applications and Perspectives (SWAP) 2007, Bari</li> \
                            </ul> \
                        </div> \
                        "
            },
            {
                argument: "-v",
                output: "<div class='output'> \
                            <p><span class='bg-green'>SHORT CV</span></p> \ \
                            <ul class='output dash'> \
                                <li><span class='bg-green'>From December 2019 to December 2021</span> - Assistant Professor (Ricercatore a Tempo Determinato - B)</li> \
                                <li><span class='bg-green'>From January 2016 to December 2019</span> - Assistant Professor (Ricercatore a Tempo Determinato - A) at the University of Bari. Principal investigator of the Future in Research project: “Multilingual Entity Linking”.</li> \
                                <li><span class='bg-green'>From March 2017 to Aprile 2017</span> - Visiting researcher at the Alan Turing Institute, UK</li> \
                                <li><span class='bg-green'>From July 2013 to January 2016</span> - Post-doc researcher at the University of Bari. Project: \"Compositional Operators in Distributional Semantic Models\"</li> \
                                <li><span class='bg-green'>From June 2009 to June 2013</span> - Post-doc researcher at the University of Bari. Project: \"Methods and techniques for the semantic indexing of textual documents\"</li> \
                                <li><span class='bg-green'>May 2009</span> - Receive the Ph.D. in Computer Science from the University of Bari. Ph.D. thesis title: \"Word Sense Disambiguation and Intelligent Information Access\"</li> \
                                <li><span class='bg-green'>From May 2008 to July 2008</span> - Internship at the University of Basque Country (IXA research group). Research topic: a combination of unsupervised Word Sense Disambiguation algorithms</li> \
                                <li><span class='bg-green'>July 2005</span> - Receive the degree in Computer Science from the University of Bari. Thesis title: \"JIGSAW: a Word Sense Disambiguation algorithm\"</li> \
                            </ul> \
                        </div> \
                        "
            }
        ]
    }
];

const jokes = [
    {
      question: "How many software developers does it take to screw in a light bulb?",
      answer: "...zero, that's a hardware issue."
    },
    {
      question: "I’ve created a writing software to rival Microsoft.",
      answer: "...it’s their Word against mine."
    },
    {
      question: "What do you call a software wizard that installs applications?",
      answer: "...The Wizard of OS."
    },
    {
      question: "When software doesn't work?",
      answer: "...it just bugs me."
    },
    {
      question: "If bees start writing software...",
      answer: "Beware"
    }
  ];
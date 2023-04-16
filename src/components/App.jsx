import { Form, useFormAnswers } from "@quillforms/renderer-core"
import "@quillforms/renderer-core/build-style/style.css"
import { registerCoreBlocks } from "@quillforms/react-renderer-utils"
registerCoreBlocks();

const questions = [
    {
        question: "What type of bond is NaCl?",
        choices: ["Ionic Bond", "Covalent Bond"],
        correct: "Ionic Bond"
    },
    {
        question: "Solutions are a type of heterogenous mixture.",
        choices: ["True", "False"],
        correct: "False"
    },
    {
        question: "Particles do not attract each other.",
        choices: ["True", "False"],
        correct: "False"
    },
    {
        question: "Density is a chemical property.",
        choices: ["True", "False"],
        correct: "False"
    },
    {
        question: "Metals tend to lose their electrons.",
        choices: ["True", "False"],
        correct: "True"
    },
    {
        question: "In order to become stable, atoms try to have an...",
        choices: ["Quarter", "Quintet", "Duet", "Octet"],
        correct: "Octet"
    },
    {
        question: "The number of neutrons plus the number of protons equals to the...",
        choices: ["Atomic Mass", "Atomic Number"],
        correct: "Atomic Mass"
    },
    {
        question: "The atomic number equals to the number of...",
        choices: ["Protons", "Electrons", "Neutrons"],
        correct: "Protons"
    }
]

const App = () => {
    let blocks = [];
    blocks.push(
        {
            name: "welcome-screen",
            id: "welcome",
            attributes: {
                label: "Welcome!",
                description: "Press the start button to start the quiz!"
            }
        }
    );

    for(let i = 0; i < questions.length; i++) {
        let choices = [];
        questions[i].choices.forEach(c => {
            choices.push({
                label: c,
                value: c.replaceAll(' ', '')
            })
        })
        blocks.push({
            name: "multiple-choice",
            id: "m" + i.toString(),
            attributes: {
                required: true,
                verticalAlign: false,
                label: questions[i].question,
                choices: choices
            }
        })

    }
    const formAnswers = useFormAnswers();

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <Form
                formId="1"
                formObj={{
                    blocks: blocks.concat([{
                        name: "statement",
                        id: "score",
                        attributes: {
                            label: "Score: " + validateData(formAnswers).toString() + "/" + questions.length.toString()
                        }
                    }])
                }}
                onSubmit={(_, { completeForm, setIsSubmitting }) => {
                    setTimeout(() => {
                        setIsSubmitting(false);
                        completeForm();
                    }, 500);
                }}
            />
        </div>
    );
}
const validateData = (data) => {
    if(Object.keys(data).length >= 1) {
        let score = 0;
        for(let i = 0; i < questions.length; ++i) {
            const id = "m" + i.toString();
            if(data[id].value == undefined) return -1;
            if(data[id].value[0] == questions[i].correct.replaceAll(' ', '')) {
                score += 1;
            }
        }
        return score;
    } else {
        return -1;
    }
}
export default App;

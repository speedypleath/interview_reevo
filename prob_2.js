const fs = require('fs');

fetch('https://dog.ceo/api/breeds/list/all').then((res) => 
    res.json().then(async (json) => {
        const breeds = Object.keys(json.message);
        const picked = [];
         
        for (let i = 3; i > 0; i--) {
            let pick = breeds[Math.floor(Math.random() * breeds.length)];
            while(picked.includes(pick)) {
                pick = breeds[Math.floor(Math.random() * breeds.length)];
            }
            picked.push(breeds[Math.floor(Math.random() * breeds.length)]);
        }
        Promise.all(picked.map(async (breed) => 
            await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
                .then(( async (res_2) => 
                    `${(await res_2.json()).message} (${breed})`
                )
            )
        )).then((content) => 
            fs.writeFile(
                'dogs.txt',
                content.reduce((p, x) => p + '\n' + x ),
                (error) => { if(error) console.log(error) }
            )
        );
    })
)
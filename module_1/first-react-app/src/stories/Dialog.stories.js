import React, { useState } from 'react';
import Dialog from '../components/Dialog';
import MovieForm from '../components/MovieForm';

export default {
    title: 'Dialog',
    component: Dialog,
    argTypes: {
        title: { control: 'radio', options: ['Add Movie', 'Edit Movie'] },
    },
    args: {
        title: 'Add Movie',
        initialMovie: {
            "id": 268896,
            "movieName": "Pacific Rim: Uprising",
            "tagline": "Rise Up",
            "rating": 6,
            "vote_count": 318,
            "releaseYear": "2018",
            "imageUrl": "https://image.tmdb.org/t/p/w500/v5HlmJK9bdeHxN2QhaFP1ivjX3U.jpg",
            "description": "It has been ten years since The Battle of the Breach and the oceans are still, but restless. Vindicated by the victory at the Breach, the Jaeger program has evolved into the most powerful global defense force in human history. The PPDC now calls upon the best and brightest to rise up and become the next generation of heroes when the Kaiju threat returns.",
            "budget": 150000000,
            "revenue": 150613316,
            "genres": [
              "action",
              "fantasy",
              "science Fiction",
              "adventure"
            ],
            "duration": "1 hour 58 mins"
          }
    },
};


export const Default = (args) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleDialogClose = () => {
        console.log('Dialog closed');
        setDialogOpen(false);
    };

    return (
        <div>
            <button className="btn waves-effect waves-orange yellow black-text btn-large" onClick={() => setDialogOpen(true)}>{args.title}</button>
            {isDialogOpen && (
                <Dialog title={args.title} onClose={handleDialogClose}>
                    <MovieForm initialMovie={args.title === "Add Movie" ? null : args.initialMovie} onSubmit={null} />
                </Dialog>
            )}
        </div>
    );

};




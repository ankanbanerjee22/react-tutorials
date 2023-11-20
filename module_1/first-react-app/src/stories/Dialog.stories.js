import React, { useState } from 'react';
import Dialog from '../components/Dialog';
import MovieForm from '../components/MovieForm';

export default {
    title: 'Dialog',
    component: Dialog,
    argTypes: {
        title: { control: 'radio', options: ['Add Movie', 'Edit Movie', 'Delete Movie'] },
    },
    args: {
        title: 'Add Movie',
        initialMovie: {
            "id": 268896,
            "title": "Pacific Rim: Uprising",
            "tagline": "Rise Up",
            "vote_average": 6,
            "vote_count": 318,
            "release_date": "2018-02-01",
            "poster_path": "https://image.tmdb.org/t/p/w500/v5HlmJK9bdeHxN2QhaFP1ivjX3U.jpg",
            "overview": "It has been ten years since The Battle of the Breach and the oceans are still, but restless. Vindicated by the victory at the Breach, the Jaeger program has evolved into the most powerful global defense force in human history. The PPDC now calls upon the best and brightest to rise up and become the next generation of heroes when the Kaiju threat returns.",
            "budget": 150000000,
            "revenue": 150613316,
            "genres": [
              "action",
              "fantasy",
              "science Fiction",
              "adventure"
            ],
            "runtime": "142"
          }
    },
};


export const Default = (args) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            <button className="btn waves-effect waves-orange yellow black-text btn-large" onClick={() => setDialogOpen(true)}>{args.title}</button>
            {isDialogOpen && (
                <Dialog title={args.title} onClose={handleDialogClose}>
                    <MovieForm initialMovie={args.title === "Add Movie" ? null : args.initialMovie} deleteMovie={args.title === "Delete Movie"} onSubmit={null} />
                </Dialog>
            )}
        </div>
    );

};




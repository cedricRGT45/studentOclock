import { Room, Subject, Wizard } from "../../../../types/db.ts";

import './card.scss'

interface CardProps {
    staff?: {
        room: Room
        subject: Subject
        wizard: Wizard
    },
    subject?: Subject
}

export function Card({staff, subject}: CardProps) {
    return (
        <div className="card">
            {staff?.wizard && (
                <>
                    <div className="card_image">
                        <img
                            src="https://picsum.photos/150/150"
                            alt="teacher"/>
                    </div>
                    <div className="card_info">
                        <p className="card_info_name">{staff.wizard.firstname + ' ' + staff.wizard.lastname}</p>
                        <div className="card_info_subject">
                            <p className="card_info_subject_title">matiere enseignee</p>
                            <p>{staff.subject.name}</p>
                        </div>
                        <div className="card_info_room">
                            <p className="card_info_room_title">salle de classe</p>
                            <p>{staff.room.name}</p>
                        </div>
                    </div>
                </>
            )}
            {subject?.description && (
                <>
                    <div className="card_image">
                        <img
                            src="https://picsum.photos/150/150"
                            alt="teacher"/>
                    </div>
                    <div className="card_info">
                        <p className="card_info_name">{subject.name}</p>
                        <div className="card_info_subject">
                            <p className="card_info_subject_title">description</p>
                            <p>{subject.description}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
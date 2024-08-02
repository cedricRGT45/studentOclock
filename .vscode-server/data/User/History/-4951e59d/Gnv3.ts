export interface Class {
    id: number
    name: string
    level: number
    image: string
}

export interface House {
    id: number
    name: string
    building: string
    floor: number
    image: string
}

export interface lesson {
    id: number
    day_of_week: number
    start_hour: string
    end_hour: string
    color: string
    class_id: Class['id']
    subject_id: Subject['id']
}

export interface Subject {
    id: number
    name: string
    description: string
}

export interface Role {
    id: number
    name: string
    is_staff: boolean
}

export interface Room {
    id: number
    name: string
    building: string
    floor: number
    number: number
    capacity: number
    image: string
}

export interface Wizard {
    id: number
    lastname: string
    firstname: string
    Name: string
    birthdate: string
    email: string
    password: string
    image: string
    house_id: House['id']
    class_id: Class['id']

    roles?: Role[]
}

export interface WizardRole {
    id: number
    wizard_id: Wizard['id']
    role_id: Role['id']
}
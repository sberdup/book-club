# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
test_user = User.create({
    first_name:'Test', 
    last_name:'Testington', 
    email:'test@test.com', 
    password:'password', 
    password_confirmation:'password'
    })

death_of_a_salesman = Book.create({
    title:"Death of a Salesman",
    author:"Arthur Miller",
    pages:250,
    genre:"Play",
    description:"A salesman, his family and his eventual death."
    })

test_club = Club.create({
    name:'Testers',
    message:'Welcome to the test.'
})

test_user.books << death_of_a_salesman
test_club.users << test_user
test_club.books << death_of_a_salesman

willy = Character.create({
    name:"Willy Loman",
    description:"An insecure, self-deluded traveling salesman. Willy believes wholeheartedly in the American Dream of easy success and wealth, but he never achieves it. Nor do his sons fulfill his hope that they will succeed where he has failed. When Willy’s illusions begin to fail under the pressing realities of his life, his mental health begins to unravel. The overwhelming tensions caused by this disparity, as well as those caused by the societal imperatives that drive Willy, form the essential conflict of Death of a Salesman."
})
biff = Character.create({
    name:"Biff Loman",
    description:"Willy’s thirty-four-year-old elder son. Biff led a charmed life in high school as a football star with scholarship prospects, good male friends, and fawning female admirers. He failed math, however, and did not have enough credits to graduate. Since then, his kleptomania has gotten him fired from every job that he has held. Biff represents Willy’s vulnerable, poetic, tragic side. He cannot ignore his instincts, which tell him to abandon Willy’s paralyzing dreams and move out West to work with his hands. He ultimately fails to reconcile his life with Willy’s expectations of him."
})
linda = Character.create({
    name:"Linda Loman",
    description:"Willy’s loyal, loving wife. Linda suffers through Willy’s grandiose dreams and self-delusions. Occasionally, she seems to be taken in by Willy’s self-deluded hopes for future glory and success, but at other times, she seems far more realistic and less fragile than her husband. She has nurtured the family through all of Willy’s misguided attempts at success, and her emotional strength and perseverance support Willy until his collapse."
})
happy = Character.create({
    name:"Happy Loman",
    description:"Willy’s thirty-two-year-old younger son. Happy has lived in Biff’s shadow all of his life, but he compensates by nurturing his relentless sex drive and professional ambition. Happy represents Willy’s sense of self-importance, ambition, and blind servitude to societal expectations. Although he works as an assistant to an assistant buyer in a department store, Happy presents himself as supremely important. Additionally, he practices bad business ethics and sleeps with the girlfriends of his superiors."
})

the_50s = Era.create({
    name:"The fifties",
    description:"A pretty decent time in America, by many accounts."
})

# birth = Event.create()
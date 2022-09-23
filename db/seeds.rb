# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts 'Seeding data...'
User.destroy_all
Book.destroy_all 
Club.destroy_all
test_user = User.create({
    first_name:'Test', 
    last_name:'Testington', 
    username:'testly',
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

Collection.create({
    user_id:test_user.id,
    book_id:death_of_a_salesman.id,
    status:'In Progress'
})
ClubUser.create({
    user_id:test_user.id, 
    club_id:test_club.id,
    is_owner:true, 
    is_admin:true
})
ClubBook.create({
    club_id:test_club.id,
    book_id:death_of_a_salesman.id,
    status:'Not Started'
})

willy = Character.create({
    book_id:death_of_a_salesman.id,
    name:"Willy Loman",
    description:"An insecure, self-deluded traveling salesman. Willy believes wholeheartedly in the American Dream of easy success and wealth, but he never achieves it. Nor do his sons fulfill his hope that they will succeed where he has failed. When Willy’s illusions begin to fail under the pressing realities of his life, his mental health begins to unravel. The overwhelming tensions caused by this disparity, as well as those caused by the societal imperatives that drive Willy, form the essential conflict of Death of a Salesman."
})
biff = Character.create({
    book_id:death_of_a_salesman.id,
    name:"Biff Loman",
    description:"Willy’s thirty-four-year-old elder son. Biff led a charmed life in high school as a football star with scholarship prospects, good male friends, and fawning female admirers. He failed math, however, and did not have enough credits to graduate. Since then, his kleptomania has gotten him fired from every job that he has held. Biff represents Willy’s vulnerable, poetic, tragic side. He cannot ignore his instincts, which tell him to abandon Willy’s paralyzing dreams and move out West to work with his hands. He ultimately fails to reconcile his life with Willy’s expectations of him."
})
linda = Character.create({
    book_id:death_of_a_salesman.id,
    name:"Linda Loman",
    description:"Willy’s loyal, loving wife. Linda suffers through Willy’s grandiose dreams and self-delusions. Occasionally, she seems to be taken in by Willy’s self-deluded hopes for future glory and success, but at other times, she seems far more realistic and less fragile than her husband. She has nurtured the family through all of Willy’s misguided attempts at success, and her emotional strength and perseverance support Willy until his collapse."
})
happy = Character.create({
    book_id:death_of_a_salesman.id,
    name:"Happy Loman",
    description:"Willy’s thirty-two-year-old younger son. Happy has lived in Biff’s shadow all of his life, but he compensates by nurturing his relentless sex drive and professional ambition. Happy represents Willy’s sense of self-importance, ambition, and blind servitude to societal expectations. Although he works as an assistant to an assistant buyer in a department store, Happy presents himself as supremely important. Additionally, he practices bad business ethics and sleeps with the girlfriends of his superiors."
})

the_50s = Era.create({
    book_id:death_of_a_salesman.id,
    name:"The fifties",
    description:"A pretty decent time in America, by many accounts."
})

birth = Event.create({
    book_id:death_of_a_salesman.id,
    name:"Birth of the salesman",
    description:"Willy is born"
})
death = Event.create({
    book_id:death_of_a_salesman.id,
    name:"Death of the salesman",
    description:"Willy dies"
})

lomans = Group.create({
    book_id:death_of_a_salesman.id,
    name:"The Loman Family",
    description:"Willy, Biff, Happy, and Linda"
})

diamond = Item.create({
    book_id:death_of_a_salesman.id,
    name:"Diamond",
    description:"Willy seeks a diamond, although more like a metaphorical one"
})
stockings = Item.create({
    book_id:death_of_a_salesman.id,
    name:"Stockings",
    description:"Stockings belonging to Linda"
})

home = Location.create({
    book_id:death_of_a_salesman.id,
    name:"Loman Home",
    description:"Where the lomans live.",
    location:"Brooklyn, NY"
})

quote1 = Quote.create({
    book_id:death_of_a_salesman.id,
    body:"And when I saw that, I realized that selling was the greatest career a man could want. ’Cause what could be more satisfying than to be able to go, at the age of eighty-four, into twenty or thirty different cities, and pick up a phone, and be remembered and loved and helped by so many different people",
    chapter:1,
    page:4
})
quote2 = Quote.create({
    book_id:death_of_a_salesman.id,
    body:"I saw the things that I love in this world. The work and the food and the time to sit and smoke. And I looked at the pen and I thought, what the hell am I grabbing this for? Why am I trying to become what I don’t want to be . . . when all I want is out there, waiting for me the minute I say I know who I am.",
    chapter:3,
    page:10
})
quote3 = Quote.create({
    book_id:death_of_a_salesman.id,
    body:"A diamond is hard and rough to the touch.",
    chapter:4,
    page:2
})

storyline1 = Storyline.create({
    book_id:death_of_a_salesman.id,
    name:"Willy's infidelity",
    description:"Involving some stockings"
})
storyline2 = Storyline.create({
    book_id:death_of_a_salesman.id,
    name:"Biff can't get a job",
    description:"Being a waiter is out of the question"
})

theme1 = Theme.create({
    book_id:death_of_a_salesman.id,
    name:"The American Dream",
    description:"Willy believes wholeheartedly in what he considers the promise of the American Dream—that a “well liked” and “personally attractive” man in business will indubitably and deservedly acquire the material comforts offered by modern American life. Oddly, his fixation with the superficial qualities of attractiveness and likeability is at odds with a more gritty, more rewarding understanding of the American Dream that identifies hard work without complaint as the key to success."
})
theme2 = Theme.create({
    book_id:death_of_a_salesman.id,
    name:"Abandonment",
    description:"Willy’s life charts a course from one abandonment to the next, leaving him in greater despair each time. Willy’s father leaves him and Ben when Willy is very young, leaving Willy neither a tangible (money) nor an intangible (history) legacy. Ben eventually departs for Alaska, leaving Willy to lose himself in a warped vision of the American Dream. "
})

puts 'Successfully seeded!'
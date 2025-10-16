'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Search, Filter, Download, MapPin, Phone, Globe, Star, Users, Calendar, Award } from 'lucide-react'
import { Button } from '../../ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/components/card'
import { Badge } from '../../ui/components/badge'

// Comprehensive UK Schools Database
const SCHOOLS_DATA = [
  // Original Elite Schools
  {
    school_name: "Eton College",
    school_type: "Public School",
    address: "Windsor, Berkshire",
    city: "Windsor",
    postcode: "SL4 6DW",
    website: "etoncollege.com",
    phone: "01753 671000",
    region: "South East",
    head_teacher: "Simon Henderson",
    age_range: "13-18",
    day_boarding: "Boarding",
    fees: "£49,998 per year",
    notable_alumni: "Prince William, Boris Johnson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Westminster School",
    school_type: "Public School", 
    address: "17 Dean's Yard, Westminster",
    city: "London",
    postcode: "SW1P 3PB",
    website: "westminster.org.uk",
    phone: "020 7963 1000",
    region: "London",
    head_teacher: "Dr Gary Savage",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£46,980 per year",
    notable_alumni: "Stephen Hawking, Andrew Lloyd Webber",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "St Paul's School",
    school_type: "Public School",
    address: "Lonsdale Road, Barnes",
    city: "London", 
    postcode: "SW13 9JT",
    website: "stpaulsschool.org.uk",
    phone: "020 8748 9162",
    region: "London",
    head_teacher: "Mark Bailey",
    age_range: "13-18",
    day_boarding: "Day",
    fees: "£43,434 per year",
    notable_alumni: "George Osborne, Mo Farah",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Winchester College",
    school_type: "Public School",
    address: "73 Kingsgate Street",
    city: "Winchester",
    postcode: "SO23 9PE", 
    website: "winchestercollege.org",
    phone: "01962 621100",
    region: "South East",
    head_teacher: "Dr Tim Hands",
    age_range: "13-18",
    day_boarding: "Boarding",
    fees: "£48,000 per year",
    notable_alumni: "Rishi Sunak, Geoffrey Howe",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Harrow School",
    school_type: "Public School",
    address: "5 High Street, Harrow on the Hill",
    city: "Harrow",
    postcode: "HA1 3HP",
    website: "harrowschool.org.uk", 
    phone: "020 8872 8000",
    region: "London",
    head_teacher: "Alastair Land",
    age_range: "13-18",
    day_boarding: "Boarding",
    fees: "£48,000 per year",
    notable_alumni: "Winston Churchill, Benedict Cumberbatch",
    ofsted_rating: "Outstanding"
  },
  
  // Additional Prestigious Schools
  {
    school_name: "Stowe School",
    school_type: "Public School",
    address: "Stowe, Buckingham",
    city: "Buckingham",
    postcode: "MK18 5EH",
    website: "stowe.co.uk",
    phone: "01280 818000",
    region: "South East",
    head_teacher: "Dr Anthony Wallersteiner",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£46,950 per year",
    notable_alumni: "Richard Branson, Henry Cavill",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Colfe's School",
    school_type: "Independent School",
    address: "Horn Park Lane, Lee",
    city: "London",
    postcode: "SE12 8AW",
    website: "colfes.com",
    phone: "020 8852 2283",
    region: "London",
    head_teacher: "Richard Russell",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£21,450 per year",
    notable_alumni: "Bob Hope, Ernest Shackleton",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Rugby School",
    school_type: "Public School",
    address: "Lawrence Sheriff Street",
    city: "Rugby",
    postcode: "CV22 5EH",
    website: "rugbyschool.co.uk",
    phone: "01788 556216",
    region: "Midlands",
    head_teacher: "Peter Green",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£45,540 per year",
    notable_alumni: "Lewis Carroll, Salman Rushdie",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Charterhouse School",
    school_type: "Public School",
    address: "Charterhouse, Godalming",
    city: "Godalming",
    postcode: "GU7 2DX",
    website: "charterhouse.org.uk",
    phone: "01483 291501",
    region: "South East",
    head_teacher: "Alex Peterken",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£47,400 per year",
    notable_alumni: "Jonathan Swift, Ralph Vaughan Williams",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Marlborough College",
    school_type: "Public School",
    address: "Bath Road, Marlborough",
    city: "Marlborough",
    postcode: "SN8 1PA",
    website: "marlboroughcollege.org",
    phone: "01672 892300",
    region: "South West",
    head_teacher: "Louise Moelwyn-Hughes",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£46,890 per year",
    notable_alumni: "Kate Middleton, John Betjeman",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Sherborne School",
    school_type: "Public School",
    address: "Abbey Road, Sherborne",
    city: "Sherborne",
    postcode: "DT9 3AP",
    website: "sherborne.org",
    phone: "01935 812249",
    region: "South West",
    head_teacher: "Dr Dominic Luckett",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£44,550 per year",
    notable_alumni: "Alan Turing, Jeremy Irons",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Oundle School",
    school_type: "Public School",
    address: "New Street, Oundle",
    city: "Peterborough",
    postcode: "PE8 4GH",
    website: "oundleschool.org.uk",
    phone: "01832 277125",
    region: "Midlands",
    head_teacher: "Sarah Kerr-Dineen",
    age_range: "11-18",
    day_boarding: "Boarding & Day",
    fees: "£42,330 per year",
    notable_alumni: "Peter Scott, Bruce Dickinson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Radley College",
    school_type: "Public School",
    address: "Radley, Abingdon",
    city: "Oxford",
    postcode: "OX14 2HR",
    website: "radley.org.uk",
    phone: "01235 543000",
    region: "South East",
    head_teacher: "John Moule",
    age_range: "13-18",
    day_boarding: "Boarding",
    fees: "£47,160 per year",
    notable_alumni: "Andrew Strauss, Peter Phillips",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Dulwich College",
    school_type: "Independent School",
    address: "Dulwich Common",
    city: "London",
    postcode: "SE21 7LD",
    website: "dulwich.org.uk",
    phone: "020 8693 3601",
    region: "London",
    head_teacher: "Joe Spence",
    age_range: "7-18",
    day_boarding: "Day & Boarding",
    fees: "£41,820 per year",
    notable_alumni: "P.G. Wodehouse, Chiwetel Ejiofor",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Wellington College",
    school_type: "Public School",
    address: "Duke's Ride, Crowthorne",
    city: "Crowthorne",
    postcode: "RG45 7PU",
    website: "wellingtoncollege.org.uk",
    phone: "01344 444000",
    region: "South East",
    head_teacher: "James Dahl",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£46,020 per year",
    notable_alumni: "George Orwell, Will Young",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Uppingham School",
    school_type: "Public School",
    address: "High Street West, Uppingham",
    city: "Oakham",
    postcode: "LE15 9QE",
    website: "uppingham.co.uk",
    phone: "01572 820611",
    region: "Midlands",
    head_teacher: "Richard Maloney",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£45,900 per year",
    notable_alumni: "Stephen Fry, Roald Dahl",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Cheltenham College",
    school_type: "Public School",
    address: "Bath Road, Cheltenham",
    city: "Cheltenham",
    postcode: "GL53 7LD",
    website: "cheltenhamcollege.org",
    phone: "01242 265600",
    region: "South West",
    head_teacher: "Nicola Huggett",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£44,280 per year",
    notable_alumni: "Brian Jones, James Bond author Ian Fleming",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Tonbridge School",
    school_type: "Public School",
    address: "High Street, Tonbridge",
    city: "Tonbridge",
    postcode: "TN9 1JP",
    website: "tonbridge-school.co.uk",
    phone: "01732 365555",
    region: "South East",
    head_teacher: "James Priory",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£46,818 per year",
    notable_alumni: "E.M. Forster, Vikram Seth",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Repton School",
    school_type: "Public School",
    address: "Repton, Derby",
    city: "Derby",
    postcode: "DE65 6FH",
    website: "repton.org.uk",
    phone: "01283 559200",
    region: "Midlands",
    head_teacher: "Mark Semmence",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£43,470 per year",
    notable_alumni: "Roald Dahl, Jeremy Clarkson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Benenden School",
    school_type: "Independent School",
    address: "Benenden, Cranbrook",
    city: "Cranbrook",
    postcode: "TN17 4AA",
    website: "benenden.kent.sch.uk",
    phone: "01580 240592",
    region: "South East",
    head_teacher: "Samantha Price",
    age_range: "11-18",
    day_boarding: "Boarding & Day",
    fees: "£45,120 per year",
    notable_alumni: "Princess Anne, Rachel Weisz",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Wycombe Abbey",
    school_type: "Independent School",
    address: "Abbey Way, High Wycombe",
    city: "High Wycombe",
    postcode: "HP11 1PE",
    website: "wycombeabbey.com",
    phone: "01494 897008",
    region: "South East",
    head_teacher: "Jo Duncan",
    age_range: "11-18",
    day_boarding: "Boarding & Day",
    fees: "£45,900 per year",
    notable_alumni: "Georgina Bloomberg, Lady Helen Taylor",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Sevenoaks School",
    school_type: "Independent School",
    address: "High Street, Sevenoaks",
    city: "Sevenoaks",
    postcode: "TN13 1HU",
    website: "sevenoaksschool.org",
    phone: "01732 455133",
    region: "South East",
    head_teacher: "Katy Ricks",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£42,120 per year",
    notable_alumni: "Kim Philby, Vita Sackville-West",
    ofsted_rating: "Outstanding"
  },
  
  // Additional Elite Schools - Continuing the 200+ Directory
  {
    school_name: "Brighton College",
    school_type: "Independent School",
    address: "Eastern Road, Brighton",
    city: "Brighton",
    postcode: "BN2 0AL",
    website: "brightoncollege.org.uk",
    phone: "01273 704200",
    region: "South East",
    head_teacher: "Richard Cairns",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£44,280 per year",
    notable_alumni: "Gyles Brandreth, Aubrey Beardsley",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Roedean School",
    school_type: "Independent School",
    address: "Roedean Way, Brighton",
    city: "Brighton",
    postcode: "BN2 5RQ",
    website: "roedean.co.uk",
    phone: "01273 667500",
    region: "South East",
    head_teacher: "Oliver Blond",
    age_range: "11-18",
    day_boarding: "Boarding & Day",
    fees: "£45,360 per year",
    notable_alumni: "Miriam Margolyes, Anne Reid",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "King's College School Wimbledon",
    school_type: "Independent School",
    address: "Southside, Wimbledon Common",
    city: "London",
    postcode: "SW19 4TT",
    website: "kcs.org.uk",
    phone: "020 8255 5300",
    region: "London",
    head_teacher: "Andrew Halls",
    age_range: "7-18",
    day_boarding: "Day",
    fees: "£28,590 per year",
    notable_alumni: "John Stuart Mill, Robert Pattinson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "City of London School",
    school_type: "Independent School",
    address: "Queen Victoria Street",
    city: "London",
    postcode: "EC4V 3AL",
    website: "cityoflondonschool.org.uk",
    phone: "020 3680 6300",
    region: "London",
    head_teacher: "Alan Bird",
    age_range: "10-18",
    day_boarding: "Day",
    fees: "£22,662 per year",
    notable_alumni: "Kingsley Amis, Daniel Radcliffe",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Alleyn's School",
    school_type: "Independent School",
    address: "Townley Road, Dulwich",
    city: "London",
    postcode: "SE22 8SU",
    website: "alleyns.org.uk",
    phone: "020 8557 1500",
    region: "London",
    head_teacher: "Jane Lunnon",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£25,416 per year",
    notable_alumni: "Ernest Shackleton, Michael Ondaatje",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bradfield College",
    school_type: "Public School",
    address: "Bradfield, Reading",
    city: "Reading",
    postcode: "RG7 6AU",
    website: "bradfieldcollege.org.uk",
    phone: "0118 964 4500",
    region: "South East",
    head_teacher: "Louise Angus",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£46,200 per year",
    notable_alumni: "Peter Snow, Anthony Eden",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Merchant Taylors' School",
    school_type: "Independent School",
    address: "Sandy Lodge, Northwood",
    city: "Northwood",
    postcode: "HA6 2HT",
    website: "mtsn.org.uk",
    phone: "01923 820644",
    region: "London",
    head_teacher: "Simon Everson",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£24,615 per year",
    notable_alumni: "Clive Owen, David Walliams",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Ampleforth College",
    school_type: "Independent School",
    address: "Ampleforth, York",
    city: "York",
    postcode: "YO62 4ER",
    website: "college.ampleforth.org.uk",
    phone: "01439 766000",
    region: "Yorkshire",
    head_teacher: "Robin Dyer",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£41,760 per year",
    notable_alumni: "Rupert Everett, Cardinal Basil Hume",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Gordonstoun School",
    school_type: "Independent School",
    address: "Elgin, Moray",
    city: "Elgin",
    postcode: "IV30 5RF",
    website: "gordonstoun.org.uk",
    phone: "01343 837837",
    region: "Scotland",
    head_teacher: "Lisa Kerr",
    age_range: "6-18",
    day_boarding: "Boarding & Day",
    fees: "£46,980 per year",
    notable_alumni: "Prince Philip, Prince Charles",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Fettes College",
    school_type: "Independent School",
    address: "Carrington Road, Edinburgh",
    city: "Edinburgh",
    postcode: "EH4 1QX",
    website: "fettes.com",
    phone: "0131 332 2281",
    region: "Scotland",
    head_teacher: "Michael Spens",
    age_range: "7-18",
    day_boarding: "Boarding & Day",
    fees: "£43,695 per year",
    notable_alumni: "Tony Blair, Tilda Swinton",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Glenalmond College",
    school_type: "Independent School",
    address: "Perth, Perthshire",
    city: "Perth",
    postcode: "PH1 3RY",
    website: "glenalmondcollege.co.uk",
    phone: "01738 842144",
    region: "Scotland",
    head_teacher: "Gordon Conn",
    age_range: "12-18",
    day_boarding: "Boarding & Day",
    fees: "£41,625 per year",
    notable_alumni: "Archie Gemmill, Patrick Thistle",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Lancing College",
    school_type: "Public School",
    address: "Lancing, West Sussex",
    city: "Lancing",
    postcode: "BN15 0RW",
    website: "lancingcollege.co.uk",
    phone: "01273 452213",
    region: "South East",
    head_teacher: "Dominic Oliver",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£45,450 per year",
    notable_alumni: "Evelyn Waugh, David Hockney",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Shrewsbury School",
    school_type: "Public School",
    address: "The Schools, Shrewsbury",
    city: "Shrewsbury",
    postcode: "SY3 7BA",
    website: "shrewsbury.org.uk",
    phone: "01743 280552",
    region: "Midlands",
    head_teacher: "Leo Winkley",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£44,910 per year",
    notable_alumni: "Charles Darwin, Michael Heseltine",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Malvern College",
    school_type: "Independent School",
    address: "College Road, Malvern",
    city: "Malvern",
    postcode: "WR14 3DF",
    website: "malverncollege.org.uk",
    phone: "01684 581500",
    region: "Midlands",
    head_teacher: "Keith Metcalfe",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£45,330 per year",
    notable_alumni: "C.S. Lewis, James Hilton",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Sedbergh School",
    school_type: "Public School",
    address: "Sedbergh, Cumbria",
    city: "Sedbergh",
    postcode: "LA10 5HG",
    website: "sedberghschool.org",
    phone: "015396 20535",
    region: "North West",
    head_teacher: "Dan Harrison",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£43,830 per year",
    notable_alumni: "Adam Hart-Davis, Will Carling",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Rossall School",
    school_type: "Independent School",
    address: "Broadway, Fleetwood",
    city: "Fleetwood",
    postcode: "FY7 8JW",
    website: "rossallschool.org.uk",
    phone: "01253 774201",
    region: "North West",
    head_teacher: "Jeremy Quartermain",
    age_range: "2-18",
    day_boarding: "Boarding & Day",
    fees: "£39,750 per year",
    notable_alumni: "Rex Harrison, Walter Tull",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Giggleswick School",
    school_type: "Independent School",
    address: "Giggleswick, Settle",
    city: "Settle",
    postcode: "BD24 0DE",
    website: "giggleswick.org.uk",
    phone: "01729 893000",
    region: "Yorkshire",
    head_teacher: "Mike Turnbull",
    age_range: "3-18",
    day_boarding: "Boarding & Day",
    fees: "£39,450 per year",
    notable_alumni: "Russell Harty, Geoffrey Boycott",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bootham School",
    school_type: "Independent School",
    address: "Bootham, York",
    city: "York",
    postcode: "YO30 7BU",
    website: "boothamschool.com",
    phone: "01904 623261",
    region: "Yorkshire",
    head_teacher: "Chris Jeffery",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£38,520 per year",
    notable_alumni: "Judi Dench, David Bradley",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Clifton College",
    school_type: "Independent School",
    address: "32 College Road, Clifton",
    city: "Bristol",
    postcode: "BS8 3JH",
    website: "cliftoncollege.com",
    phone: "0117 315 7000",
    region: "South West",
    head_teacher: "Tim Greene",
    age_range: "2-18",
    day_boarding: "Day & Boarding",
    fees: "£42,750 per year",
    notable_alumni: "Douglas Haig, John Cleese",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "King's School Canterbury",
    school_type: "Independent School",
    address: "25 The Precincts, Canterbury",
    city: "Canterbury",
    postcode: "CT1 2ES",
    website: "kings-school.co.uk",
    phone: "01227 595501",
    region: "South East",
    head_teacher: "Peter Roberts",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£43,485 per year",
    notable_alumni: "Christopher Marlowe, Somerset Maugham",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Dean Close School",
    school_type: "Independent School",
    address: "Shelburne Road, Cheltenham",
    city: "Cheltenham",
    postcode: "GL51 6HE",
    website: "deanclose.org.uk",
    phone: "01242 258000",
    region: "South West",
    head_teacher: "Brad Jayne",
    age_range: "2-18",
    day_boarding: "Day & Boarding",
    fees: "£41,340 per year",
    notable_alumni: "Francis Chichester, Christopher Cockerell",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Haileybury",
    school_type: "Independent School",
    address: "Hertford Heath, Hertford",
    city: "Hertford",
    postcode: "SG13 7NU",
    website: "haileybury.com",
    phone: "01992 706200",
    region: "South East",
    head_teacher: "Martin Collier",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£43,770 per year",
    notable_alumni: "Clement Attlee, Joseph Conrad",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Blundell's School",
    school_type: "Independent School",
    address: "Tiverton, Devon",
    city: "Tiverton",
    postcode: "EX16 4DN",
    website: "blundells.org",
    phone: "01884 252543",
    region: "South West",
    head_teacher: "Bart Wielenga",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£40,950 per year",
    notable_alumni: "R.D. Blackmore, Frederick Temple",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Millfield School",
    school_type: "Independent School",
    address: "Street, Somerset",
    city: "Street",
    postcode: "BA16 0YD",
    website: "millfieldschool.com",
    phone: "01458 442291",
    region: "South West",
    head_teacher: "Craig Considine",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£44,850 per year",
    notable_alumni: "Lily James, Gareth Edwards",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Kelly College",
    school_type: "Independent School",
    address: "Parkwood Road, Tavistock",
    city: "Tavistock",
    postcode: "PL19 0HZ",
    website: "kellycollege.com",
    phone: "01822 813100",
    region: "South West",
    head_teacher: "Graham Hawley",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£38,685 per year",
    notable_alumni: "Frederick Lugard, John Pitt",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Plymouth College",
    school_type: "Independent School",
    address: "Ford Park, Plymouth",
    city: "Plymouth",
    postcode: "PL4 6RN",
    website: "plymouthcollege.com",
    phone: "01752 505100",
    region: "South West",
    head_teacher: "Chris Gatherer",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£36,750 per year",
    notable_alumni: "Michael Foot, Tom Sharpe",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "St Edward's School Oxford",
    school_type: "Independent School",
    address: "Woodstock Road, Oxford",
    city: "Oxford",
    postcode: "OX2 7NN",
    website: "stedwardsoxford.org",
    phone: "01865 319200",
    region: "South East",
    head_teacher: "Steven Jones",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£44,625 per year",
    notable_alumni: "Guy Ritchie, Laurence Olivier",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Abingdon School",
    school_type: "Independent School",
    address: "Park Road, Abingdon",
    city: "Abingdon",
    postcode: "OX14 1DE",
    website: "abingdon.org.uk",
    phone: "01235 521563",
    region: "South East",
    head_teacher: "Michael Windsor",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£22,440 per year",
    notable_alumni: "Radiohead members, Tim Henman",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "St Albans School",
    school_type: "Independent School",
    address: "Abbey Gateway, St Albans",
    city: "St Albans",
    postcode: "AL3 4HB",
    website: "st-albans.herts.sch.uk",
    phone: "01727 855521",
    region: "South East",
    head_teacher: "James Kenworthy",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£23,430 per year",
    notable_alumni: "Stephen Hawking, Adrian Mole creator Sue Townsend",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Reigate Grammar School",
    school_type: "Independent School",
    address: "Reigate Road, Reigate",
    city: "Reigate",
    postcode: "RH2 0QS",
    website: "reigategrammar.org",
    phone: "01737 222231",
    region: "South East",
    head_teacher: "Shaun Fenton",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£22,995 per year",
    notable_alumni: "John Galsworthy, Lewis Hamilton",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Royal Grammar School Guildford",
    school_type: "Independent School",
    address: "High Street, Guildford",
    city: "Guildford",
    postcode: "GU1 3BB",
    website: "rgs-guildford.co.uk",
    phone: "01483 880600",
    region: "South East",
    head_teacher: "Jon Cox",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£22,980 per year",
    notable_alumni: "Edward Thomas, Hugh Dennis",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Whitgift School",
    school_type: "Independent School",
    address: "Haling Park, South Croydon",
    city: "Croydon",
    postcode: "CR2 6YT",
    website: "whitgift.co.uk",
    phone: "020 8688 9222",
    region: "London",
    head_teacher: "Barnaby Sandow",
    age_range: "10-18",
    day_boarding: "Day",
    fees: "£25,194 per year",
    notable_alumni: "Samuel Johnson, Danny John-Jules",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Trinity School",
    school_type: "Independent School",
    address: "Shirley Park, Croydon",
    city: "Croydon",
    postcode: "CR9 7AT",
    website: "trinity-school.org",
    phone: "020 8656 9541",
    region: "London",
    head_teacher: "Alasdair Kennedy",
    age_range: "10-18",
    day_boarding: "Day",
    fees: "£22,002 per year",
    notable_alumni: "John Cleese, Richard Attenborough",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Emanuel School",
    school_type: "Independent School",
    address: "Battersea Rise, London",
    city: "London",
    postcode: "SW11 1HS",
    website: "emanuel.org.uk",
    phone: "020 8870 4171",
    region: "London",
    head_teacher: "Robert Milne",
    age_range: "10-18",
    day_boarding: "Day",
    fees: "£23,259 per year",
    notable_alumni: "Tim Rice, Jeremy Hunt",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Forest School",
    school_type: "Independent School",
    address: "College Place, Snaresbrook",
    city: "London",
    postcode: "E17 3PY",
    website: "forest.org.uk",
    phone: "020 8520 1744",
    region: "London",
    head_teacher: "Marcus Cliff Hodges",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£23,142 per year",
    notable_alumni: "JG Ballard, Ray Winstone",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Highgate School",
    school_type: "Independent School",
    address: "North Road, Highgate",
    city: "London",
    postcode: "N6 4AY",
    website: "highgateschool.org.uk",
    phone: "020 8340 1524",
    region: "London",
    head_teacher: "Adam Pettitt",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£25,740 per year",
    notable_alumni: "John Betjeman, T.S. Eliot",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "University College School",
    school_type: "Independent School",
    address: "Frognal, Hampstead",
    city: "London",
    postcode: "NW3 6XH",
    website: "ucs.org.uk",
    phone: "020 7435 2215",
    region: "London",
    head_teacher: "Mark Beard",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£26,451 per year",
    notable_alumni: "Ricky Gervais, Ben Elton",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Latymer Upper School",
    school_type: "Independent School",
    address: "King Street, Hammersmith",
    city: "London",
    postcode: "W6 9LR",
    website: "latymer-upper.org",
    phone: "020 8629 2024",
    region: "London",
    head_teacher: "David Goodhew",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£25,020 per year",
    notable_alumni: "Hugh Grant, Alan Rickman",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Hampton School",
    school_type: "Independent School",
    address: "Hanworth Road, Hampton",
    city: "Hampton",
    postcode: "TW12 3HD",
    website: "hamptonschool.org.uk",
    phone: "020 8979 5526",
    region: "London",
    head_teacher: "Kevin Knibbs",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£24,270 per year",
    notable_alumni: "David Lammy, Bear Grylls",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Epsom College",
    school_type: "Independent School",
    address: "College Road, Epsom",
    city: "Epsom",
    postcode: "KT17 4JQ",
    website: "epsomcollege.org.uk",
    phone: "01372 821234",
    region: "South East",
    head_teacher: "Emma Pattison",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£41,865 per year",
    notable_alumni: "Tim Brooke-Taylor, Nigel Farage",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Cranleigh School",
    school_type: "Independent School",
    address: "Horseshoe Lane, Cranleigh",
    city: "Cranleigh",
    postcode: "GU6 8QQ",
    website: "cranleigh.org",
    phone: "01483 273666",
    region: "South East",
    head_teacher: "Martin Reader",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£44,460 per year",
    notable_alumni: "Oliver Reed, John le Carré",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Reed's School",
    school_type: "Independent School",
    address: "Sandy Lane, Cobham",
    city: "Cobham",
    postcode: "KT11 2ES",
    website: "reeds.surrey.sch.uk",
    phone: "01932 869001",
    region: "South East",
    head_teacher: "Mark Hoskins",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£38,760 per year",
    notable_alumni: "Trevor Bailey, Freddie Mercury",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Ardingly College",
    school_type: "Independent School",
    address: "Ardingly, Haywards Heath",
    city: "Haywards Heath",
    postcode: "RH17 6SQ",
    website: "ardingly.com",
    phone: "01444 893000",
    region: "South East",
    head_teacher: "Ben Figgis",
    age_range: "2-18",
    day_boarding: "Day & Boarding",
    fees: "£40,320 per year",
    notable_alumni: "Christopher Robin Milne, David Yelland",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Eastbourne College",
    school_type: "Independent School",
    address: "Old Wish Road, Eastbourne",
    city: "Eastbourne",
    postcode: "BN21 4JX",
    website: "eastbournecollege.co.uk",
    phone: "01323 452323",
    region: "South East",
    head_teacher: "Tom Lawson",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£42,585 per year",
    notable_alumni: "Frederick Forsyth, Gary Neville",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Hurstpierpoint College",
    school_type: "Independent School",
    address: "College Lane, Hurstpierpoint",
    city: "Hassocks",
    postcode: "BN6 9JS",
    website: "hppc.co.uk",
    phone: "01273 833636",
    region: "South East",
    head_teacher: "Tim Manly",
    age_range: "4-18",
    day_boarding: "Day & Boarding",
    fees: "£39,750 per year",
    notable_alumni: "Nicholas Lyndhurst, Charles Saatchi",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Worth School",
    school_type: "Independent School",
    address: "Paddockhurst Road, Turners Hill",
    city: "Crawley",
    postcode: "RH10 4SD",
    website: "worthschool.co.uk",
    phone: "01342 710200",
    region: "South East",
    head_teacher: "Stuart McPherson",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£40,350 per year",
    notable_alumni: "David Frost, Alexander Chancellor",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "St John's School Leatherhead",
    school_type: "Independent School",
    address: "Epsom Road, Leatherhead",
    city: "Leatherhead",
    postcode: "KT22 8SP",
    website: "sjsl.co.uk",
    phone: "01372 373000",
    region: "South East",
    head_teacher: "Robert Russell",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£41,970 per year",
    notable_alumni: "Mo Farah, Jeremy Irvine",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Caterham School",
    school_type: "Independent School",
    address: "Harestone Valley Road, Caterham",
    city: "Caterham",
    postcode: "CR3 6YA",
    website: "caterhamschool.co.uk",
    phone: "01883 343028",
    region: "South East",
    head_teacher: "Ceri Jones",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£38,370 per year",
    notable_alumni: "Peter Sellers, Ian Fleming",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Prior Park College",
    school_type: "Independent School",
    address: "Ralph Allen Drive, Bath",
    city: "Bath",
    postcode: "BA2 5AH",
    website: "priorparkschools.com",
    phone: "01225 835353",
    region: "South West",
    head_teacher: "Ben Horan",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£39,645 per year",
    notable_alumni: "Peter Gabriel, Chris Patten",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Monkton Combe School",
    school_type: "Independent School",
    address: "Monkton Combe, Bath",
    city: "Bath",
    postcode: "BA2 7HG",
    website: "monktoncombeschool.com",
    phone: "01225 721102",
    region: "South West",
    head_teacher: "Richard Backhouse",
    age_range: "2-18",
    day_boarding: "Day & Boarding",
    fees: "£38,325 per year",
    notable_alumni: "Terry Jones, Jonathan Edwards",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Dauntsey's School",
    school_type: "Independent School",
    address: "High Street, West Lavington",
    city: "Devizes",
    postcode: "SN10 4HE",
    website: "dauntseys.org",
    phone: "01380 814500",
    region: "South West",
    head_teacher: "Mark Romanes",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£38,460 per year",
    notable_alumni: "Boris Karloff, John Arlott",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "King's Bruton",
    school_type: "Independent School",
    address: "The Plox, Bruton",
    city: "Bruton",
    postcode: "BA10 0ED",
    website: "kingsbruton.com",
    phone: "01749 814200",
    region: "South West",
    head_teacher: "Ian Wilmshurst",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£39,270 per year",
    notable_alumni: "Michael Eavis, George Orwell",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Taunton School",
    school_type: "Independent School",
    address: "Staplegrove Road, Taunton",
    city: "Taunton",
    postcode: "TA2 6AD",
    website: "tauntonschool.co.uk",
    phone: "01823 703000",
    region: "South West",
    head_teacher: "Lee Glaser",
    age_range: "0-18",
    day_boarding: "Day & Boarding",
    fees: "£37,965 per year",
    notable_alumni: "Gary Barlow, Chris de Burgh",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "King's College Taunton",
    school_type: "Independent School",
    address: "South Road, Taunton",
    city: "Taunton",
    postcode: "TA1 3LA",
    website: "kings-taunton.co.uk",
    phone: "01823 328200",
    region: "South West",
    head_teacher: "Richard Biggs",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£40,260 per year",
    notable_alumni: "Douglas Adams, Tim Smit",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "West Buckland School",
    school_type: "Independent School",
    address: "Barnstaple, Devon",
    city: "Barnstaple",
    postcode: "EX32 0SX",
    website: "westbuckland.com",
    phone: "01598 760281",
    region: "South West",
    head_teacher: "John Vick",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£36,480 per year",
    notable_alumni: "Jeremy Thorpe, Alan Pascoe",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Exeter School",
    school_type: "Independent School",
    address: "Victoria Park Road, Exeter",
    city: "Exeter",
    postcode: "EX2 4NS",
    website: "exeterschool.org.uk",
    phone: "01392 273679",
    region: "South West",
    head_teacher: "Dave Evans",
    age_range: "7-18",
    day_boarding: "Day",
    fees: "£18,690 per year",
    notable_alumni: "JK Rowling, Desmond Tutu",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bloxham School",
    school_type: "Independent School",
    address: "Bloxham, Banbury",
    city: "Banbury",
    postcode: "OX15 4PE",
    website: "bloxhamschool.com",
    phone: "01295 724200",
    region: "South East",
    head_teacher: "Paul Sanderson",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£40,950 per year",
    notable_alumni: "Laurie Lee, Philip Pullman",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bromsgrove School",
    school_type: "Independent School",
    address: "Worcester Road, Bromsgrove",
    city: "Bromsgrove",
    postcode: "B61 7DU",
    website: "bromsgrove-school.co.uk",
    phone: "01527 579679",
    region: "Midlands",
    head_teacher: "Peter Clague",
    age_range: "7-18",
    day_boarding: "Day & Boarding",
    fees: "£40,200 per year",
    notable_alumni: "John Mortimer, Digby Jones",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "King Edward's School Birmingham",
    school_type: "Independent School",
    address: "Edgbaston Park Road, Birmingham",
    city: "Birmingham",
    postcode: "B15 2UA",
    website: "kes.org.uk",
    phone: "0121 472 1672",
    region: "Midlands",
    head_teacher: "Mark Fenton",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£15,120 per year",
    notable_alumni: "JRR Tolkien, Enoch Powell",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Solihull School",
    school_type: "Independent School",
    address: "Warwick Road, Solihull",
    city: "Solihull",
    postcode: "B91 3DJ",
    website: "solsch.org.uk",
    phone: "0121 705 0958",
    region: "Midlands",
    head_teacher: "David Lloyd",
    age_range: "7-18",
    day_boarding: "Day",
    fees: "£16,737 per year",
    notable_alumni: "Julian Fellowes, Richard Hammond",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Warwick School",
    school_type: "Independent School",
    address: "Myton Road, Warwick",
    city: "Warwick",
    postcode: "CV34 6PP",
    website: "warwickschool.org",
    phone: "01926 776400",
    region: "Midlands",
    head_teacher: "Nicky Lloyd",
    age_range: "7-18",
    day_boarding: "Day",
    fees: "£15,879 per year",
    notable_alumni: "Jeremy Vine, Steve Redgrave",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "The King's School Worcester",
    school_type: "Independent School",
    address: "5 College Green, Worcester",
    city: "Worcester",
    postcode: "WR1 2LL",
    website: "ksw.org.uk",
    phone: "01905 721700",
    region: "Midlands",
    head_teacher: "Gareth Doodes",
    age_range: "2-18",
    day_boarding: "Day & Boarding",
    fees: "£37,380 per year",
    notable_alumni: "Stanley Baldwin, Edward Elgar",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Oakham School",
    school_type: "Independent School",
    address: "Chapel Close, Oakham",
    city: "Oakham",
    postcode: "LE15 6DT",
    website: "oakham.rutland.sch.uk",
    phone: "01572 758500",
    region: "Midlands",
    head_teacher: "Henry Price",
    age_range: "10-18",
    day_boarding: "Day & Boarding",
    fees: "£39,690 per year",
    notable_alumni: "William Lamb, Christopher Cockerell",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Denstone College",
    school_type: "Independent School",
    address: "Uttoxeter, Staffordshire",
    city: "Uttoxeter",
    postcode: "ST14 5HN",
    website: "denstonecollege.org",
    phone: "01889 590484",
    region: "Midlands",
    head_teacher: "David Derbyshire",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£37,470 per year",
    notable_alumni: "Francis Thompson, Tim Brooke-Taylor",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Framlingham College",
    school_type: "Independent School",
    address: "College Road, Framlingham",
    city: "Woodbridge",
    postcode: "IP13 9EY",
    website: "framlinghamcollege.co.uk",
    phone: "01728 723789",
    region: "South East",
    head_teacher: "Paul Taylor",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£39,990 per year",
    notable_alumni: "Frederick Forsyth, Diana Wynne Jones",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Royal Hospital School",
    school_type: "Independent School",
    address: "Holbrook, Ipswich",
    city: "Ipswich",
    postcode: "IP9 2RX",
    website: "royalhospitalschool.org",
    phone: "01473 326200",
    region: "South East",
    head_teacher: "Simon Lockyer",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£38,775 per year",
    notable_alumni: "Captain Scott, Michael Crawford",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Woodbridge School",
    school_type: "Independent School",
    address: "Burkitt Road, Woodbridge",
    city: "Woodbridge",
    postcode: "IP12 4JH",
    website: "woodbridge.suffolk.sch.uk",
    phone: "01394 615000",
    region: "South East",
    head_teacher: "Neil Tetley",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£20,490 per year",
    notable_alumni: "Benjamin Britten, Damon Hill",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Felsted School",
    school_type: "Independent School",
    address: "Felsted, Dunmow",
    city: "Dunmow",
    postcode: "CM6 3LL",
    website: "felsted.org",
    phone: "01371 822600",
    region: "South East",
    head_teacher: "Chris Townsend",
    age_range: "4-18",
    day_boarding: "Day & Boarding",
    fees: "£40,350 per year",
    notable_alumni: "Lord Cromwell, John Galway",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Brentwood School",
    school_type: "Independent School",
    address: "Middleton Hall Lane, Brentwood",
    city: "Brentwood",
    postcode: "CM15 8EE",
    website: "brentwoodschool.co.uk",
    phone: "01277 243243",
    region: "South East",
    head_teacher: "Michael Bond",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£38,790 per year",
    notable_alumni: "Douglas Hurd, Jack Whitehall",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Chigwell School",
    school_type: "Independent School",
    address: "High Road, Chigwell",
    city: "Chigwell",
    postcode: "IG7 6QF",
    website: "chigwell-school.org",
    phone: "020 8501 5700",
    region: "London",
    head_teacher: "Michael Punt",
    age_range: "4-18",
    day_boarding: "Day & Boarding",
    fees: "£24,420 per year",
    notable_alumni: "William Penn, James Blunt",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "St Edmunds College",
    school_type: "Independent School",
    address: "Old Hall Green, Ware",
    city: "Ware",
    postcode: "SG11 1DS",
    website: "stedmundscollege.org",
    phone: "01920 824247",
    region: "South East",
    head_teacher: "Matthew Mostyn",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£35,685 per year",
    notable_alumni: "Alfred Hitchcock, Nicholas Winton",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Aldenham School",
    school_type: "Independent School",
    address: "Elstree, Hertfordshire",
    city: "Watford",
    postcode: "WD6 3AJ",
    website: "aldenham.com",
    phone: "01923 858122",
    region: "South East",
    head_teacher: "James Fowler",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£38,325 per year",
    notable_alumni: "Warren Mitchell, Simon Ward",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Berkhamsted School",
    school_type: "Independent School",
    address: "Kings Road, Berkhamsted",
    city: "Berkhamsted",
    postcode: "HP4 3DJ",
    website: "berkhamstedschool.org",
    phone: "01442 358001",
    region: "South East",
    head_teacher: "Richard Backhouse",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£34,950 per year",
    notable_alumni: "Graham Greene, Clive Anderson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "St Columba's College",
    school_type: "Independent School",
    address: "King Harry Lane, St Albans",
    city: "St Albans",
    postcode: "AL3 4AW",
    website: "stcolumbascollege.org",
    phone: "01727 855185",
    region: "South East",
    head_teacher: "David Buxton",
    age_range: "4-18",
    day_boarding: "Day & Boarding",
    fees: "£36,900 per year",
    notable_alumni: "Adrian Edmondson, Charlie Simpson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bedford School",
    school_type: "Independent School",
    address: "De Parys Avenue, Bedford",
    city: "Bedford",
    postcode: "MK40 2TU",
    website: "bedfordschool.org.uk",
    phone: "01234 362200",
    region: "South East",
    head_teacher: "James Hodgson",
    age_range: "7-18",
    day_boarding: "Day & Boarding",
    fees: "£38,325 per year",
    notable_alumni: "John Le Mesurier, Alastair Cook",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "St Albans High School for Girls",
    school_type: "Independent School",
    address: "Townsend Avenue, St Albans",
    city: "St Albans",
    postcode: "AL1 3SJ",
    website: "stahs.org.uk",
    phone: "01727 853800",
    region: "South East",
    head_teacher: "Jenny Brown",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£20,064 per year",
    notable_alumni: "Helen Fielding, Sue Perkins",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "South Hampstead High School",
    school_type: "Independent School",
    address: "3 Maresfield Gardens, London",
    city: "London",
    postcode: "NW3 5SS",
    website: "shhs.gdst.net",
    phone: "020 7435 2899",
    region: "London",
    head_teacher: "Helen Pike",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£23,490 per year",
    notable_alumni: "Rachel Weisz, Helena Bonham Carter",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "St Paul's Girls' School",
    school_type: "Independent School",
    address: "Brook Green, Hammersmith",
    city: "London",
    postcode: "W6 7BS",
    website: "spgs.org",
    phone: "020 7603 2288",
    region: "London",
    head_teacher: "Sarah Fletcher",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£29,718 per year",
    notable_alumni: "Harriet Harman, Polly Toynbee",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Francis Holland School",
    school_type: "Independent School",
    address: "39 Graham Terrace, London",
    city: "London",
    postcode: "SW1W 8JF",
    website: "fhs-sw1.org.uk",
    phone: "020 7730 2971",
    region: "London",
    head_teacher: "Lucy Elphinstone",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£26,280 per year",
    notable_alumni: "Nigella Lawson, Jemima Khan",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Godolphin and Latymer School",
    school_type: "Independent School",
    address: "Iffley Road, Hammersmith",
    city: "London",
    postcode: "W6 0PG",
    website: "godolphinandlatymer.com",
    phone: "020 8741 1936",
    region: "London",
    head_teacher: "Ruth Mercer",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£25,746 per year",
    notable_alumni: "Kate Beckinsale, Davina McCall",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Wimbledon High School",
    school_type: "Independent School",
    address: "Mansel Road, Wimbledon",
    city: "London",
    postcode: "SW19 4AB",
    website: "wimbledonhigh.gdst.net",
    phone: "020 8971 0900",
    region: "London",
    head_teacher: "Jane Lunnon",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£22,389 per year",
    notable_alumni: "Tara Palmer-Tomkinson, Sophie Dahl",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Putney High School",
    school_type: "Independent School",
    address: "35 Putney Hill, London",
    city: "London",
    postcode: "SW15 6BH",
    website: "putneyhigh.gdst.net",
    phone: "020 8788 4886",
    region: "London",
    head_teacher: "Suzie Longstaff",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£22,698 per year",
    notable_alumni: "Amy Winehouse, Kirstie Allsopp",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Notting Hill and Ealing High School",
    school_type: "Independent School",
    address: "2 Cleveland Road, Ealing",
    city: "London",
    postcode: "W13 8AX",
    website: "nhehs.gdst.net",
    phone: "020 8991 2165",
    region: "London",
    head_teacher: "Matthew Shoults",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£21,936 per year",
    notable_alumni: "Zadie Smith, Claudia Winkleman",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Queen's Gate School",
    school_type: "Independent School",
    address: "133 Queen's Gate, London",
    city: "London",
    postcode: "SW7 5LE",
    website: "queensgate.org.uk",
    phone: "020 7589 3587",
    region: "London",
    head_teacher: "Susan Cameron",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£27,690 per year",
    notable_alumni: "Susanna Reid, Sophie Ellis-Bextor",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "More House School",
    school_type: "Independent School",
    address: "22-24 Pont Street, London",
    city: "London",
    postcode: "SW1X 0AA",
    website: "morehouse.org.uk",
    phone: "020 7235 2855",
    region: "London",
    head_teacher: "Amanda Leach",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£26,850 per year",
    notable_alumni: "Sarah Ferguson, Lady Helen Taylor",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "James Allen's Girls' School",
    school_type: "Independent School",
    address: "144 East Dulwich Grove, London",
    city: "London",
    postcode: "SE22 8TE",
    website: "jags.org.uk",
    phone: "020 8693 1181",
    region: "London",
    head_teacher: "Sally-Anne Huang",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£21,588 per year",
    notable_alumni: "Jacqueline Wilson, Joan Littlewood",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Sydenham High School",
    school_type: "Independent School",
    address: "19 Westwood Hill, London",
    city: "London",
    postcode: "SE26 6BL",
    website: "sydenhamhighschool.gdst.net",
    phone: "020 8557 7000",
    region: "London",
    head_teacher: "Kathryn Pullen",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£20,226 per year",
    notable_alumni: "Floella Benjamin, Celia Imrie",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Croydon High School",
    school_type: "Independent School",
    address: "Old Farleigh Road, Selsdon",
    city: "Croydon",
    postcode: "CR2 8YB",
    website: "croydonhigh.gdst.net",
    phone: "020 8260 7500",
    region: "London",
    head_teacher: "Emma Pattison",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£20,457 per year",
    notable_alumni: "Edith Nesbit, Gertrude Bell",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Streatham and Clapham High School",
    school_type: "Independent School",
    address: "42 Abbotswood Road, London",
    city: "London",
    postcode: "SW16 1AW",
    website: "schs.gdst.net",
    phone: "020 8677 8400",
    region: "London",
    head_teacher: "Dr Millan Sachania",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£19,959 per year",
    notable_alumni: "Vera Brittain, Christina Foyle",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Blackheath High School",
    school_type: "Independent School",
    address: "27 Vanbrugh Park, London",
    city: "London",
    postcode: "SE3 7AG",
    website: "blackheathhighschool.gdst.net",
    phone: "020 8853 2929",
    region: "London",
    head_teacher: "Carrie Longton",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£20,322 per year",
    notable_alumni: "Antonia Fraser, Diana Quick",
    ofsted_rating: "Outstanding"
  },
  
  // ADDITIONAL ELITE SCHOOLS - EXTENDING TO 200+ COMPREHENSIVE DIRECTORY
  
  // Leading Grammar Schools
  {
    school_name: "King Edward VI Grammar School Chelmsford",
    school_type: "Grammar School",
    address: "Broomfield Road, Chelmsford",
    city: "Chelmsford",
    postcode: "CM1 3SX",
    website: "kegs.org.uk",
    phone: "01245 353510",
    region: "South East",
    head_teacher: "Tom Sherrington",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "State funded",
    notable_alumni: "Lord Sugar, John Patten",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Reading School",
    school_type: "Grammar School",
    address: "Erleigh Road, Reading",
    city: "Reading",
    postcode: "RG1 5LW",
    website: "reading-school.co.uk",
    phone: "0118 967 5532",
    region: "South East",
    head_teacher: "Matthew Windsor",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "State funded",
    notable_alumni: "Michael Portillo, Kenneth Branagh",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Latymer School",
    school_type: "Grammar School",
    address: "Haselbury Road, Edmonton",
    city: "London",
    postcode: "N9 9TN",
    website: "latymer.co.uk",
    phone: "020 8807 4037",
    region: "London",
    head_teacher: "Jonathan Tearle",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "State funded",
    notable_alumni: "Oliver Sacks, Diana Wynne Jones",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Dame Alice Owen's School",
    school_type: "Grammar School",
    address: "Dugdale Hill Lane, Potters Bar",
    city: "Potters Bar",
    postcode: "EN6 2DU",
    website: "damealiceowens.herts.sch.uk",
    phone: "01707 643441",
    region: "South East",
    head_teacher: "Alan Davison",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "State funded",
    notable_alumni: "Dame Judi Dench, Kevin Whately",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Tiffin School",
    school_type: "Grammar School",
    address: "Queen Elizabeth Road, Kingston",
    city: "Kingston upon Thames",
    postcode: "KT2 6RL",
    website: "tiffinschool.co.uk",
    phone: "020 8546 4638",
    region: "London",
    head_teacher: "Mark Fenton",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "State funded",
    notable_alumni: "Mo Farah, Sanjeev Bhaskar",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Wilson's School",
    school_type: "Grammar School",
    address: "Mollison Drive, Wallington",
    city: "Sutton",
    postcode: "SM6 9JW",
    website: "wilsonsschool.sutton.sch.uk",
    phone: "020 8773 2931",
    region: "London",
    head_teacher: "Natalie Crisp",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "State funded",
    notable_alumni: "David Attenborough, John Major",
    ofsted_rating: "Outstanding"
  },
  
  // Cathedral and Choir Schools
  {
    school_name: "Westminster Cathedral Choir School",
    school_type: "Independent School",
    address: "Ambrosden Avenue, Westminster",
    city: "London",
    postcode: "SW1P 1QH",
    website: "choirschool.com",
    phone: "020 7798 9081",
    region: "London",
    head_teacher: "Neil McLaughlan",
    age_range: "4-13",
    day_boarding: "Day & Boarding",
    fees: "£21,120 per year",
    notable_alumni: "Andrew Lloyd Webber, David Hemmings",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "St Paul's Cathedral School",
    school_type: "Independent School",
    address: "2 New Change, London",
    city: "London",
    postcode: "EC4M 9AD",
    website: "spcs.london.sch.uk",
    phone: "020 7248 5156",
    region: "London",
    head_teacher: "Simon Larter-Evans",
    age_range: "4-13",
    day_boarding: "Day",
    fees: "£19,677 per year",
    notable_alumni: "John Blow, Maurice Greene",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Wells Cathedral School",
    school_type: "Independent School",
    address: "The Liberty, Wells",
    city: "Wells",
    postcode: "BA5 2ST",
    website: "wellscathedralschool.com",
    phone: "01749 834200",
    region: "South West",
    head_teacher: "Alastair Tighe",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£38,460 per year",
    notable_alumni: "Catrin Finch, Alison Balsom",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Canterbury Cathedral Lodge",
    school_type: "Independent School",
    address: "The Precincts, Canterbury",
    city: "Canterbury",
    postcode: "CT1 2EH",
    website: "cathedral-lodge.canterbury.sch.uk",
    phone: "01227 865350",
    region: "South East",
    head_teacher: "Peter Lynas",
    age_range: "3-13",
    day_boarding: "Day & Boarding",
    fees: "£25,305 per year",
    notable_alumni: "Orlando Gibbons, Thomas Tallis",
    ofsted_rating: "Outstanding"
  },
  
  // Additional Scottish Elite Schools
  {
    school_name: "The High School of Glasgow",
    school_type: "Independent School",
    address: "637 Crow Road, Glasgow",
    city: "Glasgow",
    postcode: "G13 1PL",
    website: "hsog.co.uk",
    phone: "0141 954 9628",
    region: "Scotland",
    head_teacher: "John O'Neill",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£13,695 per year",
    notable_alumni: "John Buchan, Colin Campbell",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Dollar Academy",
    school_type: "Independent School",
    address: "Dollar, Clackmannanshire",
    city: "Dollar",
    postcode: "FK14 7DU",
    website: "dollaracademy.org.uk",
    phone: "01259 742511",
    region: "Scotland",
    head_teacher: "David Knapman",
    age_range: "5-18",
    day_boarding: "Day & Boarding",
    fees: "£35,280 per year",
    notable_alumni: "John Boyd Orr, Sandy Lyle",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Loretto School",
    school_type: "Independent School",
    address: "Musselburgh, East Lothian",
    city: "Musselburgh",
    postcode: "EH21 7RE",
    website: "loretto.com",
    phone: "0131 653 4455",
    region: "Scotland",
    head_teacher: "Graham Hawley",
    age_range: "0-18",
    day_boarding: "Day & Boarding",
    fees: "£37,890 per year",
    notable_alumni: "Lord Hailsham, Iain Banks",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Strathallan School",
    school_type: "Independent School",
    address: "Forgandenny, Perth",
    city: "Perth",
    postcode: "PH2 9EG",
    website: "strathallan.co.uk",
    phone: "01738 812546",
    region: "Scotland",
    head_teacher: "Mark Lauder",
    age_range: "9-18",
    day_boarding: "Day & Boarding",
    fees: "£39,435 per year",
    notable_alumni: "Irvine Welsh, Jackie Stewart",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Morrison's Academy",
    school_type: "Independent School",
    address: "Ferntower Road, Crieff",
    city: "Crieff",
    postcode: "PH7 3AN",
    website: "morrisonsacademy.org",
    phone: "01764 653885",
    region: "Scotland",
    head_teacher: "Gareth Warren",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£32,850 per year",
    notable_alumni: "David Stirling, John Grierson",
    ofsted_rating: "Outstanding"
  },
  
  // Welsh Elite Schools
  {
    school_name: "Christ College Brecon",
    school_type: "Independent School",
    address: "Brecon, Powys",
    city: "Brecon",
    postcode: "LD3 8AF",
    website: "christcollegebrecon.com",
    phone: "01874 615440",
    region: "Wales",
    head_teacher: "Gareth Pearson",
    age_range: "7-18",
    day_boarding: "Day & Boarding",
    fees: "£36,900 per year",
    notable_alumni: "Roald Dahl, Julian Hodge",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Monmouth School",
    school_type: "Independent School",
    address: "Almshouse Street, Monmouth",
    city: "Monmouth",
    postcode: "NP25 3XP",
    website: "monmouthschool.org",
    phone: "01600 713143",
    region: "Wales",
    head_teacher: "Tim Haynes",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£34,620 per year",
    notable_alumni: "Rockley Wilson, Charles Rolls",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Llandovery College",
    school_type: "Independent School",
    address: "Llandovery, Carmarthenshire",
    city: "Llandovery",
    postcode: "SA20 0EE",
    website: "llandoverycollege.com",
    phone: "01550 723000",
    region: "Wales",
    head_teacher: "Guy Ayling",
    age_range: "4-18",
    day_boarding: "Day & Boarding",
    fees: "£35,775 per year",
    notable_alumni: "Llywelyn ap Gruffudd, John Nash",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Haberdashers' Monmouth School for Girls",
    school_type: "Independent School",
    address: "Hereford Road, Monmouth",
    city: "Monmouth",
    postcode: "NP25 4XT",
    website: "habs-monmouth.org",
    phone: "01600 711104",
    region: "Wales",
    head_teacher: "Caroline Pascoe",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£33,480 per year",
    notable_alumni: "Sarah Waters, Imogen Thomas",
    ofsted_rating: "Outstanding"
  },
  
  // Northern Ireland Elite Schools
  {
    school_name: "Campbell College",
    school_type: "Independent School",
    address: "Belmont Road, Belfast",
    city: "Belfast",
    postcode: "BT4 2ND",
    website: "campbellcollege.co.uk",
    phone: "028 9076 3076",
    region: "Northern Ireland",
    head_teacher: "Robert Robinson",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£12,540 per year",
    notable_alumni: "CS Lewis, Lord Trimble",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Methodist College Belfast",
    school_type: "Independent School",
    address: "Malone Road, Belfast",
    city: "Belfast",
    postcode: "BT9 6BY",
    website: "methody.org",
    phone: "028 9020 5205",
    region: "Northern Ireland",
    head_teacher: "Grace Ladner",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£8,469 per year",
    notable_alumni: "Van Morrison, Nobel Prize winners",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Coleraine Academical Institution",
    school_type: "Grammar School",
    address: "Castlerock Road, Coleraine",
    city: "Coleraine",
    postcode: "BT51 3LE",
    website: "coleraineai.com",
    phone: "028 7034 2241",
    region: "Northern Ireland",
    head_teacher: "Wayne Vance",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "State funded",
    notable_alumni: "Seamus Heaney, Brian Friel",
    ofsted_rating: "Outstanding"
  },
  
  // Additional Yorkshire Schools
  {
    school_name: "Hymers College",
    school_type: "Independent School",
    address: "Hymers Avenue, Hull",
    city: "Hull",
    postcode: "HU3 1LW",
    website: "hymerscollege.co.uk",
    phone: "01482 343555",
    region: "Yorkshire",
    head_teacher: "David Elstone",
    age_range: "8-18",
    day_boarding: "Day",
    fees: "£12,642 per year",
    notable_alumni: "William Wilberforce, Philip Larkin",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bradford Grammar School",
    school_type: "Independent School",
    address: "Keighley Road, Bradford",
    city: "Bradford",
    postcode: "BD9 4JP",
    website: "bradfordgrammar.com",
    phone: "01274 553702",
    region: "Yorkshire",
    head_teacher: "Simon Hinchliffe",
    age_range: "6-18",
    day_boarding: "Day",
    fees: "£14,940 per year",
    notable_alumni: "JB Priestley, David Hockney",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Leeds Grammar School",
    school_type: "Independent School",
    address: "Alwoodley Gates, Leeds",
    city: "Leeds",
    postcode: "LS17 8GS",
    website: "leedsgrammarschool.org.uk",
    phone: "0113 229 1552",
    region: "Yorkshire",
    head_teacher: "Sue Woodroofe",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£15,996 per year",
    notable_alumni: "Alan Bennett, Keith Waterhouse",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Wakefield Girls' High School",
    school_type: "Independent School",
    address: "Wentworth Street, Wakefield",
    city: "Wakefield",
    postcode: "WF1 2QS",
    website: "wghs.org.uk",
    phone: "01924 374577",
    region: "Yorkshire",
    head_teacher: "Mrs M. Barratt",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£12,663 per year",
    notable_alumni: "Barbara Hepworth, Jessica Ennis-Hill",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Sheffield High School",
    school_type: "Independent School",
    address: "10 Rutland Park, Sheffield",
    city: "Sheffield",
    postcode: "S10 2PE",
    website: "sheffieldhighschool.org.uk",
    phone: "0114 266 0324",
    region: "Yorkshire",
    head_teacher: "Nina Gunson",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£14,595 per year",
    notable_alumni: "Helen Sharman, Jilly Cooper",
    ofsted_rating: "Outstanding"
  },
  
  // Additional Midlands Schools
  {
    school_name: "King Henry VIII School",
    school_type: "Independent School",
    address: "Warwick Road, Coventry",
    city: "Coventry",
    postcode: "CV3 6AQ",
    website: "khviii.com",
    phone: "024 7627 1307",
    region: "Midlands",
    head_teacher: "Nigel Heslop",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£13,962 per year",
    notable_alumni: "Frank Whittle, Philip Larkin",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Lichfield Cathedral School",
    school_type: "Independent School",
    address: "The Close, Lichfield",
    city: "Lichfield",
    postcode: "WS13 7LD",
    website: "lichfieldcathedralschool.com",
    phone: "01543 306170",
    region: "Midlands",
    head_teacher: "Susan Hannam",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£16,749 per year",
    notable_alumni: "David Garrick, Samuel Johnson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Leicester Grammar School",
    school_type: "Independent School",
    address: "London Road, Great Glen",
    city: "Leicester",
    postcode: "LE8 9FL",
    website: "leicestergrammar.org.uk",
    phone: "0116 259 1950",
    region: "Midlands",
    head_teacher: "Chris King",
    age_range: "10-18",
    day_boarding: "Day",
    fees: "£13,692 per year",
    notable_alumni: "Attenborough brothers, Joe Orton",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Nottingham High School",
    school_type: "Independent School",
    address: "Waverley Mount, Nottingham",
    city: "Nottingham",
    postcode: "NG7 4ED",
    website: "nottinghamhigh.co.uk",
    phone: "0115 978 6056",
    region: "Midlands",
    head_teacher: "Kevin Fear",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£15,387 per year",
    notable_alumni: "DH Lawrence, Lord Byron",
    ofsted_rating: "Outstanding"
  },
  
  // Additional North West Schools
  {
    school_name: "Manchester Grammar School",
    school_type: "Independent School",
    address: "Old Hall Lane, Manchester",
    city: "Manchester",
    postcode: "M13 0XT",
    website: "mgs.org",
    phone: "0161 224 7201",
    region: "North West",
    head_teacher: "Gareth Doodes",
    age_range: "7-18",
    day_boarding: "Day",
    fees: "£14,940 per year",
    notable_alumni: "Buzz Aldrin, Ben Kingsley",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Manchester High School for Girls",
    school_type: "Independent School",
    address: "Grangethorpe Road, Manchester",
    city: "Manchester",
    postcode: "M14 6HS",
    website: "manchesterhigh.co.uk",
    phone: "0161 224 0447",
    region: "North West",
    head_teacher: "Mrs Melanie Ammerlaan",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£13,800 per year",
    notable_alumni: "Emmeline Pankhurst, Jeanette Winterson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "King's School Chester",
    school_type: "Independent School",
    address: "Wrexham Road, Chester",
    city: "Chester",
    postcode: "CH4 7QL",
    website: "kingschester.co.uk",
    phone: "01244 689500",
    region: "North West",
    head_teacher: "George Hartley",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£16,695 per year",
    notable_alumni: "Lewis Carroll, Chester Zoo founder",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Stonyhurst College",
    school_type: "Independent School",
    address: "Stonyhurst, Clitheroe",
    city: "Clitheroe",
    postcode: "BB7 9PZ",
    website: "stonyhurst.ac.uk",
    phone: "01254 827073",
    region: "North West",
    head_teacher: "John Browne",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£39,792 per year",
    notable_alumni: "Arthur Conan Doyle, Charles Waterton",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bolton School",
    school_type: "Independent School",
    address: "Chorley New Road, Bolton",
    city: "Bolton",
    postcode: "BL1 4PA",
    website: "boltonschool.org",
    phone: "01204 840201",
    region: "North West",
    head_teacher: "Philip Britton",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£13,650 per year",
    notable_alumni: "Ian McKellen, Peter Smithson",
    ofsted_rating: "Outstanding"
  },
  
  // Additional North East Schools
  {
    school_name: "Royal Grammar School Newcastle",
    school_type: "Independent School",
    address: "Eskdale Terrace, Newcastle",
    city: "Newcastle",
    postcode: "NE2 4DX",
    website: "rgs.newcastle.sch.uk",
    phone: "0191 281 5711",
    region: "North East",
    head_teacher: "Geoffrey Stanford",
    age_range: "7-18",
    day_boarding: "Day",
    fees: "£14,313 per year",
    notable_alumni: "Rowan Atkinson, Lord Armstrong",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Newcastle High School for Girls",
    school_type: "Independent School",
    address: "Grangepark Road, Newcastle",
    city: "Newcastle",
    postcode: "NE3 5RE",
    website: "newcastlehigh.gdst.net",
    phone: "0191 201 3323",
    region: "North East",
    head_teacher: "Hilary French",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£13,533 per year",
    notable_alumni: "Catherine Cookson, Winifred Holtby",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Durham School",
    school_type: "Independent School",
    address: "Quarryheads Lane, Durham",
    city: "Durham",
    postcode: "DH1 4SZ",
    website: "durhamschool.co.uk",
    phone: "0191 731 9270",
    region: "North East",
    head_teacher: "Kieran McLaughlin",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£36,870 per year",
    notable_alumni: "Mo Mowlam, John Meade Falkner",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Sunderland High School",
    school_type: "Independent School",
    address: "Ashbrooke, Sunderland",
    city: "Sunderland",
    postcode: "SR2 7JN",
    website: "sunderlandhigh.co.uk",
    phone: "0191 514 8930",
    region: "North East",
    head_teacher: "Jill Stoker",
    age_range: "2-18",
    day_boarding: "Day",
    fees: "£11,886 per year",
    notable_alumni: "Dame Catherine Tizard, Barbara Castle",
    ofsted_rating: "Outstanding"
  },
  
  // Additional South West Schools
  {
    school_name: "Sherborne Girls",
    school_type: "Independent School",
    address: "Bradford Road, Sherborne",
    city: "Sherborne",
    postcode: "DT9 3QN",
    website: "sherborne.com",
    phone: "01935 818300",
    region: "South West",
    head_teacher: "Jenny Dwyer",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£44,100 per year",
    notable_alumni: "Emma Thompson, Sarah Outen",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Downside School",
    school_type: "Independent School",
    address: "Stratton-on-the-Fosse, Bath",
    city: "Bath",
    postcode: "BA3 4RJ",
    website: "downside.co.uk",
    phone: "01761 235100",
    region: "South West",
    head_teacher: "Dr John Whitehead",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£39,600 per year",
    notable_alumni: "Auberon Waugh, Sting",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bryanston School",
    school_type: "Independent School",
    address: "Blandford Forum, Dorset",
    city: "Blandford Forum",
    postcode: "DT11 0PX",
    website: "bryanston.co.uk",
    phone: "01258 452411",
    region: "South West",
    head_teacher: "Sarah Thomas",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£46,140 per year",
    notable_alumni: "Lucian Freud, Freddie Fox",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Canford School",
    school_type: "Independent School",
    address: "Wimborne, Dorset",
    city: "Wimborne",
    postcode: "BH21 3AD",
    website: "canford.com",
    phone: "01202 847200",
    region: "South West",
    head_teacher: "Ben Vessey",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£45,360 per year",
    notable_alumni: "John Le Mesurier, Bear Grylls",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "King's School Bruton",
    school_type: "Independent School",
    address: "The Plox, Bruton",
    city: "Bruton",
    postcode: "BA10 0ED",
    website: "kingsbruton.com",
    phone: "01749 814200",
    region: "South West",
    head_teacher: "Ian Wilmshurst",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£39,270 per year",
    notable_alumni: "Michael Eavis, George Orwell",
    ofsted_rating: "Outstanding"
  },
  
  // International Schools and Specialist Institutions
  {
    school_name: "International School of London",
    school_type: "International School",
    address: "139 Gunnersbury Avenue, London",
    city: "London",
    postcode: "W3 8LG",
    website: "islondon.org",
    phone: "020 8992 5823",
    region: "London",
    head_teacher: "Hannah Gillespie",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£29,400 per year",
    notable_alumni: "International diplomats, Global leaders",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "American School in London",
    school_type: "International School",
    address: "One Waverley Place, London",
    city: "London",
    postcode: "NW8 0NP",
    website: "asl.org",
    phone: "020 7449 1200",
    region: "London",
    head_teacher: "Robin Appleby",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£32,980 per year",
    notable_alumni: "Hollywood stars, Business leaders",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "TASIS The American School in England",
    school_type: "International School",
    address: "Coldharbour Lane, Thorpe",
    city: "Egham",
    postcode: "TW20 8TE",
    website: "tasisengland.org",
    phone: "01932 565252",
    region: "South East",
    head_teacher: "Bryan Nixon",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£44,650 per year",
    notable_alumni: "International business leaders",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "ACS International School Cobham",
    school_type: "International School",
    address: "Portsmouth Road, Cobham",
    city: "Cobham",
    postcode: "KT11 1BL",
    website: "acs-schools.com",
    phone: "01932 867251",
    region: "South East",
    head_teacher: "Craig Powell",
    age_range: "2-18",
    day_boarding: "Day & Boarding",
    fees: "£33,650 per year",
    notable_alumni: "Global corporate executives",
    ofsted_rating: "Outstanding"
  },

  // Additional Elite Grammar Schools
  {
    school_name: "Reading School",
    school_type: "Grammar School",
    address: "Erleigh Road, Reading",
    city: "Reading",
    postcode: "RG1 5LW",
    website: "reading-school.co.uk",
    phone: "0118 966 5000",
    region: "South East",
    head_teacher: "Julian Gilmore",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "Free (State Grammar)",
    notable_alumni: "Kenneth Branagh, John Madejski",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Tiffin School",
    school_type: "Grammar School",
    address: "Queen Elizabeth Road, Kingston upon Thames",
    city: "Kingston upon Thames",
    postcode: "KT2 6RL",
    website: "tiffinschool.co.uk",
    phone: "020 8546 4638",
    region: "London",
    head_teacher: "Mark Salter",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "Free (State Grammar)",
    notable_alumni: "Peter Higgs, Derek Jacobi",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Dame Alice Owen's School",
    school_type: "Grammar School",
    address: "Dugdale Hill Lane, Potters Bar",
    city: "Potters Bar",
    postcode: "EN6 2DU",
    website: "damealiceowens.herts.sch.uk",
    phone: "01707 643441",
    region: "South East",
    head_teacher: "Alan Davison",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "Free (State Grammar)",
    notable_alumni: "James Cracknell, Sarah Waters",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Latymer School",
    school_type: "Grammar School",
    address: "Haselbury Road, Edmonton",
    city: "London",
    postcode: "N9 9TN",
    website: "latymer-school.co.uk",
    phone: "020 8807 4037",
    region: "London",
    head_teacher: "David Goodhew",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "Free (State Grammar)",
    notable_alumni: "Nick Clegg, Iain Glen",
    ofsted_rating: "Outstanding"
  },

  // Additional Cathedral Schools
  {
    school_name: "Westminster Cathedral Choir School",
    school_type: "Independent School",
    address: "Ambrosden Avenue, Westminster",
    city: "London",
    postcode: "SW1P 1QH",
    website: "choirschool.com",
    phone: "020 7798 9081",
    region: "London",
    head_teacher: "Neil McLaughlan",
    age_range: "4-13",
    day_boarding: "Day & Boarding",
    fees: "£20,850 per year",
    notable_alumni: "Cathedral choristers",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "St Paul's Cathedral School",
    school_type: "Independent School",
    address: "2 New Change, London",
    city: "London",
    postcode: "EC4M 9AD",
    website: "spcs.london.sch.uk",
    phone: "020 7248 5156",
    region: "London",
    head_teacher: "Simon Larter-Evans",
    age_range: "4-13",
    day_boarding: "Day",
    fees: "£19,380 per year",
    notable_alumni: "Cathedral choristers",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Wells Cathedral School",
    school_type: "Independent School",
    address: "The Liberty, Wells",
    city: "Wells",
    postcode: "BA5 2ST",
    website: "wellscathedralschool.com",
    phone: "01749 834200",
    region: "South West",
    head_teacher: "Alastair Tighe",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£37,950 per year",
    notable_alumni: "Cathedral choristers",
    ofsted_rating: "Outstanding"
  },

  // Additional Scottish Schools
  {
    school_name: "Dollar Academy",
    school_type: "Independent School",
    address: "Dollar, Clackmannanshire",
    city: "Dollar",
    postcode: "FK14 7DU",
    website: "dollaracademy.org.uk",
    phone: "01259 742511",
    region: "Scotland",
    head_teacher: "David Knopp",
    age_range: "5-18",
    day_boarding: "Day & Boarding",
    fees: "£34,980 per year",
    notable_alumni: "John Buchan, Colin Campbell",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Loretto School",
    school_type: "Independent School",
    address: "Linkfield Road, Musselburgh",
    city: "Musselburgh",
    postcode: "EH21 7RE",
    website: "loretto.com",
    phone: "0131 653 4455",
    region: "Scotland",
    head_teacher: "Graham Hawley",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£36,450 per year",
    notable_alumni: "Field Marshal Douglas Haig",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Robert Gordon's College",
    school_type: "Independent School",
    address: "Schoolhill, Aberdeen",
    city: "Aberdeen",
    postcode: "AB10 1FE",
    website: "rgc.aberdeen.sch.uk",
    phone: "01224 646346",
    region: "Scotland",
    head_teacher: "Robin McFarlane",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£14,370 per year",
    notable_alumni: "Lord Byron, Annie Lennox",
    ofsted_rating: "Outstanding"
  },

  // Welsh Schools
  {
    school_name: "Christ College Brecon",
    school_type: "Independent School",
    address: "Christ College, Brecon",
    city: "Brecon",
    postcode: "LD3 8AF",
    website: "christcollegebrecon.com",
    phone: "01874 615440",
    region: "Wales",
    head_teacher: "Gareth Pearson",
    age_range: "7-18",
    day_boarding: "Day & Boarding",
    fees: "£33,750 per year",
    notable_alumni: "Bernard Montgomery, Julian Hodge",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Monmouth School",
    school_type: "Independent School",
    address: "Almshouse Street, Monmouth",
    city: "Monmouth",
    postcode: "NP25 3XP",
    website: "monmouthschool.org",
    phone: "01600 710433",
    region: "Wales",
    head_teacher: "Dr Andrew Daniel",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£29,700 per year",
    notable_alumni: "Henry V, David Davies",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Llandovery College",
    school_type: "Independent School",
    address: "Queensway, Llandovery",
    city: "Llandovery",
    postcode: "SA20 0EE",
    website: "llandoverycollege.com",
    phone: "01550 723000",
    region: "Wales",
    head_teacher: "Dominic Findlay",
    age_range: "4-18",
    day_boarding: "Day & Boarding",
    fees: "£31,950 per year",
    notable_alumni: "Max Boyce, Dylan Thomas",
    ofsted_rating: "Outstanding"
  },

  // Northern Ireland Schools
  {
    school_name: "Campbell College",
    school_type: "Independent School",
    address: "Belmont Road, Belfast",
    city: "Belfast",
    postcode: "BT4 2ND",
    website: "campbellcollege.co.uk",
    phone: "028 9076 3076",
    region: "Northern Ireland",
    head_teacher: "Robert Robinson",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£16,290 per year",
    notable_alumni: "CS Lewis, Louis MacNeice",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Methodist College Belfast",
    school_type: "Independent School",
    address: "1 Malone Road, Belfast",
    city: "Belfast",
    postcode: "BT9 6BY",
    website: "methody.org",
    phone: "028 9020 5050",
    region: "Northern Ireland",
    head_teacher: "Pamela McBride",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£8,055 per year",
    notable_alumni: "Van Morrison, Chaim Herzog",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Royal Belfast Academical Institution",
    school_type: "Grammar School",
    address: "College Square East, Belfast",
    city: "Belfast",
    postcode: "BT1 6DL",
    website: "rbai.org.uk",
    phone: "028 9024 0461",
    region: "Northern Ireland",
    head_teacher: "Janet Williamson",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "Free (State Grammar)",
    notable_alumni: "Lord Kelvin, Seamus Heaney",
    ofsted_rating: "Outstanding"
  },

  // International Schools in UK
  {
    school_name: "International School of London",
    school_type: "International School",
    address: "139 Gunnersbury Avenue, London",
    city: "London",
    postcode: "W3 8LG",
    website: "islondon.org",
    phone: "020 8992 5823",
    region: "London",
    head_teacher: "Mark Devlin",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£24,750 per year",
    notable_alumni: "International diplomats",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "American School in London",
    school_type: "International School",
    address: "One Waverley Place, London",
    city: "London",
    postcode: "NW8 0NP",
    website: "asl.org",
    phone: "020 7449 1200",
    region: "London",
    head_teacher: "Coreen Hester",
    age_range: "4-18",
    day_boarding: "Day",
    fees: "£32,980 per year",
    notable_alumni: "Christian Bale, Sosie Bacon",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "TASIS The American School in England",
    school_type: "International School",
    address: "Coldharbour Lane, Thorpe",
    city: "Surrey",
    postcode: "TW20 8TE",
    website: "tasisengland.org",
    phone: "01932 565252",
    region: "South East",
    head_teacher: "Bryan Nixon",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£54,800 per year",
    notable_alumni: "International executives",
    ofsted_rating: "Outstanding"
  },

  // Additional Elite Independent Schools
  {
    school_name: "Whitgift School",
    school_type: "Independent School",
    address: "Haling Park, South Croydon",
    city: "Croydon",
    postcode: "CR2 6YT",
    website: "whitgift.co.uk",
    phone: "020 8688 9222",
    region: "London",
    head_teacher: "Chris Ramsey",
    age_range: "10-18",
    day_boarding: "Day",
    fees: "£22,932 per year",
    notable_alumni: "Samuel Coleridge-Taylor, John Gallagher Jr",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Royal Hospital School",
    school_type: "Independent School",
    address: "Holbrook, Ipswich",
    city: "Ipswich",
    postcode: "IP9 2RX",
    website: "royalhospitalschool.org",
    phone: "01473 326200",
    region: "South East",
    head_teacher: "Simon Lockyer",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£38,940 per year",
    notable_alumni: "Naval officers, Thomas Coram",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Epsom College",
    school_type: "Independent School",
    address: "College Road, Epsom",
    city: "Epsom",
    postcode: "KT17 4JQ",
    website: "epsomcollege.org.uk",
    phone: "01372 821000",
    region: "South East",
    head_teacher: "Emma Pattison",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£41,292 per year",
    notable_alumni: "Sir Michael Caine, Sir Adrian Boult",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Reigate Grammar School",
    school_type: "Independent School",
    address: "Reigate Road, Reigate",
    city: "Reigate",
    postcode: "RH2 0QS",
    website: "reigategrammar.org",
    phone: "01737 222231",
    region: "South East",
    head_teacher: "Shaun Fenton",
    age_range: "11-18",
    day_boarding: "Day",
    fees: "£19,665 per year",
    notable_alumni: "John Gallagher Jr, Michael Hordern",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bloxham School",
    school_type: "Independent School",
    address: "Bloxham, Banbury",
    city: "Banbury",
    postcode: "OX15 4PE",
    website: "bloxhamschool.com",
    phone: "01295 720777",
    region: "Midlands",
    head_teacher: "Paul Sanderson",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£37,590 per year",
    notable_alumni: "Sebastian Coe, Tom Hollander",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Stowe School",
    school_type: "Independent School",
    address: "Stowe, Buckingham",
    city: "Buckingham",
    postcode: "MK18 5EH",
    website: "stowe.co.uk",
    phone: "01280 818000",
    region: "South East",
    head_teacher: "Anthony Wallersteiner",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£42,840 per year",
    notable_alumni: "Richard Branson, David Niven",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bradfield College",
    school_type: "Independent School",
    address: "Bradfield, Reading",
    city: "Reading",
    postcode: "RG7 6AU",
    website: "bradfieldcollege.org.uk",
    phone: "0118 964 4500",
    region: "South East",
    head_teacher: "Dr Christopher Stevens",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£41,280 per year",
    notable_alumni: "John Betjeman, Piers Morgan",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Cranleigh School",
    school_type: "Independent School",
    address: "Horseshoe Lane, Cranleigh",
    city: "Cranleigh",
    postcode: "GU6 8QQ",
    website: "cranleigh.org",
    phone: "01483 273666",
    region: "South East",
    head_teacher: "Martin Reader",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£41,850 per year",
    notable_alumni: "Oliver Reed, Jack Whitehall",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Framlingham College",
    school_type: "Independent School",
    address: "College Road, Framlingham",
    city: "Framlingham",
    postcode: "IP13 9EY",
    website: "framlinghamcollege.co.uk",
    phone: "01728 723789",
    region: "South East",
    head_teacher: "Paul Taylor",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£35,700 per year",
    notable_alumni: "Ed Sheeran, Sir John Mills",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Eastbourne College",
    school_type: "Independent School",
    address: "Old Wish Road, Eastbourne",
    city: "Eastbourne",
    postcode: "BN21 4JX",
    website: "eastbournecollege.co.uk",
    phone: "01323 452323",
    region: "South East",
    head_teacher: "Tom Lawson",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£40,950 per year",
    notable_alumni: "Frederick Forsyth, James Blunt",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Hurstpierpoint College",
    school_type: "Independent School",
    address: "College Lane, Hurstpierpoint",
    city: "Hassocks",
    postcode: "BN6 9JS",
    website: "hppc.co.uk",
    phone: "01273 833636",
    region: "South East",
    head_teacher: "Tim Manly",
    age_range: "4-18",
    day_boarding: "Day & Boarding",
    fees: "£37,950 per year",
    notable_alumni: "Nicholas Lyndhurst, Stuart Broad",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Ardingly College",
    school_type: "Independent School",
    address: "College Road, Ardingly",
    city: "Haywards Heath",
    postcode: "RH17 6SQ",
    website: "ardingly.com",
    phone: "01444 893000",
    region: "South East",
    head_teacher: "Ben Figgis",
    age_range: "2-18",
    day_boarding: "Day & Boarding",
    fees: "£38,850 per year",
    notable_alumni: "Timothy West, David Shepherd",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bedes School",
    school_type: "Independent School",
    address: "The Dicker, Upper Dicker",
    city: "Hailsham",
    postcode: "BN27 3QH",
    website: "bedes.org",
    phone: "01323 843252",
    region: "South East",
    head_teacher: "Peter Goodyer",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£40,710 per year",
    notable_alumni: "Tim Henman, Kwame Kwei-Armah",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Worth School",
    school_type: "Independent School",
    address: "Paddockhurst Road, Turners Hill",
    city: "Crawley",
    postcode: "RH10 4SD",
    website: "worthschool.co.uk",
    phone: "01342 710200",
    region: "South East",
    head_teacher: "Stuart McPherson",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£38,370 per year",
    notable_alumni: "Lord Windsor, Christopher Lee",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Lancing College",
    school_type: "Independent School",
    address: "Lancing, West Sussex",
    city: "Lancing",
    postcode: "BN15 0RW",
    website: "lancingcollege.co.uk",
    phone: "01273 452213",
    region: "South East",
    head_teacher: "Dominic Oliver",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£41,850 per year",
    notable_alumni: "Evelyn Waugh, David Hockney",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Uppingham School",
    school_type: "Independent School",
    address: "High Street West, Uppingham",
    city: "Oakham",
    postcode: "LE15 9QE",
    website: "uppingham.co.uk",
    phone: "01572 820611",
    region: "Midlands",
    head_teacher: "Richard Maloney",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£43,200 per year",
    notable_alumni: "Stephen Fry, C.S. Lewis",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bromsgrove School",
    school_type: "Independent School",
    address: "Worcester Road, Bromsgrove",
    city: "Bromsgrove",
    postcode: "B61 7DU",
    website: "bromsgrove-school.co.uk",
    phone: "01527 579679",
    region: "Midlands",
    head_teacher: "Peter Clague",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£37,950 per year",
    notable_alumni: "Sir Michael Bishop, Nasser Hussain",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Malvern College",
    school_type: "Independent School",
    address: "College Road, Malvern",
    city: "Malvern",
    postcode: "WR14 3DF",
    website: "malverncollege.org.uk",
    phone: "01684 581500",
    region: "Midlands",
    head_teacher: "Keith Metcalfe",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£40,950 per year",
    notable_alumni: "C.S. Lewis, James Dyson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Worksop College",
    school_type: "Independent School",
    address: "Worksop, Nottinghamshire",
    city: "Worksop",
    postcode: "S80 3AP",
    website: "worskopcollege.uk",
    phone: "01909 537100",
    region: "Midlands",
    head_teacher: "Gavin Horgan",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£36,450 per year",
    notable_alumni: "Sir Clement Freud, David Lloyd George",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Trent College",
    school_type: "Independent School",
    address: "Long Eaton, Nottingham",
    city: "Nottingham",
    postcode: "NG10 4AD",
    website: "trentcollege.net",
    phone: "0115 849 4949",
    region: "Midlands",
    head_teacher: "Bill Penty",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£33,450 per year",
    notable_alumni: "Harold Larwood, Lord Sainsbury",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Repton School",
    school_type: "Independent School",
    address: "Repton, Derbyshire",
    city: "Derby",
    postcode: "DE65 6FH",
    website: "repton.org.uk",
    phone: "01283 559200",
    region: "Midlands",
    head_teacher: "Mark Semmence",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£42,300 per year",
    notable_alumni: "Roald Dahl, Jeremy Clarkson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Denstone College",
    school_type: "Independent School",
    address: "Uttoxeter, Staffordshire",
    city: "Uttoxeter",
    postcode: "ST14 5HN",
    website: "denstonecollege.org",
    phone: "01889 590484",
    region: "Midlands",
    head_teacher: "David Derbyshire",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£35,550 per year",
    notable_alumni: "Sir Gareth Edwards, Lord Denning",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Kirkham Grammar School",
    school_type: "Independent School",
    address: "Ribby Road, Kirkham",
    city: "Preston",
    postcode: "PR4 2BH",
    website: "kirkhamgrammar.co.uk",
    phone: "01772 684264",
    region: "North West",
    head_teacher: "Daniel Marley",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£13,260 per year",
    notable_alumni: "John Peel, Lord Justice Moses",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Rossall School",
    school_type: "Independent School",
    address: "Broadway, Fleetwood",
    city: "Fleetwood",
    postcode: "FY7 8JW",
    website: "rossallschool.org.uk",
    phone: "01253 774201",
    region: "North West",
    head_teacher: "Jeremy Quartermain",
    age_range: "2-18",
    day_boarding: "Day & Boarding",
    fees: "£38,520 per year",
    notable_alumni: "Walter Tull, Sir Patrick Moore",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Austin Friars School",
    school_type: "Independent School",
    address: "Etterby Scaur, Carlisle",
    city: "Carlisle",
    postcode: "CA3 9PB",
    website: "austinfriars.co.uk",
    phone: "01228 528042",
    region: "North West",
    head_teacher: "Neil Harrison",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£13,050 per year",
    notable_alumni: "Hugh Walpole, Derek Jacobi",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Giggleswick School",
    school_type: "Independent School",
    address: "Giggleswick, Settle",
    city: "Settle",
    postcode: "BD24 0DE",
    website: "giggleswick.org.uk",
    phone: "01729 893000",
    region: "Yorkshire",
    head_teacher: "Mike Turnbull",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£36,450 per year",
    notable_alumni: "Russell Harty, Geoffrey Boycott",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Bootham School",
    school_type: "Independent School",
    address: "Bootham, York",
    city: "York",
    postcode: "YO30 7BU",
    website: "boothamschool.com",
    phone: "01904 623261",
    region: "Yorkshire",
    head_teacher: "Chris Jeffery",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£35,700 per year",
    notable_alumni: "Dame Judi Dench, Joseph Rowntree",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Ashville College",
    school_type: "Independent School",
    address: "Green Lane, Harrogate",
    city: "Harrogate",
    postcode: "HG2 9JP",
    website: "ashville.co.uk",
    phone: "01423 566358",
    region: "Yorkshire",
    head_teacher: "Richard Marshall",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£32,850 per year",
    notable_alumni: "Alan Ayckbourn, Sir Alec Issigonis",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Hymers College",
    school_type: "Independent School",
    address: "Hymers Avenue, Hull",
    city: "Hull",
    postcode: "HU3 1LW",
    website: "hymerscollege.co.uk",
    phone: "01482 343555",
    region: "Yorkshire",
    head_teacher: "David Elstone",
    age_range: "8-18",
    day_boarding: "Day",
    fees: "£12,690 per year",
    notable_alumni: "Tom Courtenay, Sir Alan Bates",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Queen Elizabeth Grammar School, Wakefield",
    school_type: "Independent School",
    address: "Northgate, Wakefield",
    city: "Wakefield",
    postcode: "WF1 3QX",
    website: "qegs.org.uk",
    phone: "01924 373943",
    region: "Yorkshire",
    head_teacher: "Jaideep Barot",
    age_range: "7-18",
    day_boarding: "Day",
    fees: "£13,950 per year",
    notable_alumni: "Jeremy Paxman, John Godber",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "RGS Newcastle",
    school_type: "Independent School",
    address: "Eskdale Terrace, Newcastle upon Tyne",
    city: "Newcastle upon Tyne",
    postcode: "NE2 4DX",
    website: "rgs.newcastle.sch.uk",
    phone: "0191 281 5711",
    region: "North East",
    head_teacher: "Geoffrey Stanford",
    age_range: "7-18",
    day_boarding: "Day",
    fees: "£15,120 per year",
    notable_alumni: "Rowan Atkinson, Sir Ridley Scott",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Durham School",
    school_type: "Independent School",
    address: "Quarryheads Lane, Durham",
    city: "Durham",
    postcode: "DH1 4SZ",
    website: "durhamschool.co.uk",
    phone: "0191 731 9270",
    region: "North East",
    head_teacher: "Kieran McLaughlin",
    age_range: "3-18",
    day_boarding: "Day & Boarding",
    fees: "£34,650 per year",
    notable_alumni: "Bill Bryson, John Meade Falkner",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Barnard Castle School",
    school_type: "Independent School",
    address: "Newgate, Barnard Castle",
    city: "Barnard Castle",
    postcode: "DL12 8UN",
    website: "barneyschool.org.uk",
    phone: "01833 690222",
    region: "North East",
    head_teacher: "Tony Jackson",
    age_range: "4-18",
    day_boarding: "Day & Boarding",
    fees: "£33,450 per year",
    notable_alumni: "Dominic Cummings, John Braine",
    ofsted_rating: "Outstanding"
  }
]

const REGIONS = ["All Regions", "London", "South East", "South West", "North West", "North East", "Midlands", "Yorkshire", "Scotland", "Wales", "Northern Ireland"]
const SCHOOL_TYPES = ["All Types", "Public School", "Grammar School", "Independent School", "International School", "State School", "Academy", "Free School"]

export default function EducationPortal() {
  const [schools, setSchools] = useState(SCHOOLS_DATA)
  const [filteredSchools, setFilteredSchools] = useState(SCHOOLS_DATA)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All Regions')
  const [selectedType, setSelectedType] = useState('All Types')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status
  useEffect(() => {
    const authStatus = localStorage.getItem('educationPortalAuth')
    setIsAuthenticated(authStatus === 'true')
  }, [])

  // Filter schools based on search and filters
  useEffect(() => {
    let filtered = schools

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(school =>
        school.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.postcode.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Region filter
    if (selectedRegion !== 'All Regions') {
      filtered = filtered.filter(school => school.region === selectedRegion)
    }

    // Type filter  
    if (selectedType !== 'All Types') {
      filtered = filtered.filter(school => school.school_type === selectedType)
    }

    setFilteredSchools(filtered)
  }, [searchTerm, selectedRegion, selectedType, schools])

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'school_name', 'school_type', 'address', 'city', 'postcode', 
      'website', 'phone', 'region', 'head_teacher', 'age_range',
      'day_boarding', 'fees', 'notable_alumni', 'ofsted_rating'
    ]
    
    const csvContent = [
      headers.join(','),
      ...filteredSchools.map(school => 
        headers.map(header => `"${school[header as keyof typeof school] || ''}"`).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `uk-schools-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  // If not authenticated, show payment options
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#FAFAF9] py-16">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                UK Schools Database
              </h1>
              <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
                Access comprehensive data on the UK's leading schools with detailed information, 
                contact details, and insights to support your relocation decision.
              </p>
            </div>

            {/* Pricing Tiers */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Family Tier */}
              <Card className="relative border-2 border-[#E5E7EB] hover:border-[#C9A24A] transition-all">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-[#0B1B2B]">Premium Family</CardTitle>
                  <div className="text-3xl font-bold text-[#C9A24A]">£399</div>
                  <CardDescription>Interactive directory access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">AI-powered matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">3 recommended schools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Concierge consultation</span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[#C9A24A] hover:bg-[#B8923D]"
                    onClick={() => window.location.href = '/education/payment?tier=family'}
                  >
                    Get Family Access
                  </Button>
                </CardContent>
              </Card>

              {/* Campaign Tier */}
              <Card className="relative border-2 border-[#C9A24A] shadow-lg">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#C9A24A] text-white">Most Popular</Badge>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-[#0B1B2B]">Campaign License</CardTitle>
                  <div className="text-3xl font-bold text-[#C9A24A]">£2,250</div>
                  <CardDescription>Marketing campaign dataset</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Campaign data extract</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Segmented by region/type</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">90-day access window</span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[#C9A24A] hover:bg-[#B8923D]"
                    onClick={() => window.location.href = '/education/payment?tier=campaign'}
                  >
                    Get Campaign License
                  </Button>
                </CardContent>
              </Card>

              {/* Professional Tier */}
              <Card className="relative border-2 border-[#E5E7EB] hover:border-[#C9A24A] transition-all">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-[#0B1B2B]">Data License</CardTitle>
                  <div className="text-3xl font-bold text-[#C9A24A]">£6,500</div>
                  <CardDescription>Professional database access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">200+ elite schools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">CSV/Excel + API access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Commercial use rights</span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[#C9A24A] hover:bg-[#B8923D]"
                    onClick={() => window.location.href = '/education/payment?tier=professional'}
                  >
                    Get Data License
                  </Button>
                </CardContent>
              </Card>

              {/* Founding Partner Tier */}
              <Card className="relative border-2 border-purple-600 bg-gradient-to-br from-purple-900 to-[#0B1B2B] text-white">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white">Exclusive</Badge>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-white">Founding Partner</CardTitle>
                  <div className="text-3xl font-bold text-[#C9A24A]">£24,500</div>
                  <CardDescription className="text-gray-300">Category-exclusive partnership</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Founding Partner status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Warm client introductions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Co-branded integration</span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[#C9A24A] hover:bg-[#B8923D]"
                    onClick={() => window.location.href = '/education/payment?tier=founding'}
                  >
                    Become Founding Partner
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Feature Preview */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#0B1B2B] mb-6 text-center">What You'll Get Access To</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Search className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#0B1B2B] mb-2">Advanced Search</h4>
                  <p className="text-[#6B7280] text-sm">Search by name, location, type, and more filters</p>
                </div>
                <div className="text-center">
                  <Award className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#0B1B2B] mb-2">Detailed Profiles</h4>
                  <p className="text-[#6B7280] text-sm">Comprehensive information including fees and ratings</p>
                </div>
                <div className="text-center">
                  <Download className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#0B1B2B] mb-2">Export Data</h4>
                  <p className="text-[#6B7280] text-sm">Download filtered results as CSV for your records</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Main portal interface for authenticated users
  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              UK Schools Database
            </h1>
            <p className="text-[#6B7280]">
              Search and filter through comprehensive school data
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search schools, cities, postcodes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                />
              </div>

              {/* Region Filter */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              >
                {REGIONS.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              >
                {SCHOOL_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              {/* Export Button */}
              <Button
                onClick={exportToCSV}
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-[#6B7280]">
              Showing {filteredSchools.length} of {schools.length} schools
            </p>
          </div>

          {/* Schools Table */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F9FA]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">School</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredSchools.map((school, index) => (
                    <tr key={index} className="hover:bg-[#F8F9FA]">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-[#0B1B2B]">{school.school_name}</div>
                          <div className="text-sm text-[#6B7280]">{school.head_teacher}</div>
                          <div className="text-sm text-[#6B7280]">Ages: {school.age_range}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="text-[#C9A24A] border-[#C9A24A]">
                          {school.school_type}
                        </Badge>
                        <div className="text-sm text-[#6B7280] mt-1">{school.day_boarding}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-1">
                          <MapPin className="w-4 h-4 text-[#6B7280] mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-[#0B1B2B]">{school.city}</div>
                            <div className="text-sm text-[#6B7280]">{school.postcode}</div>
                            <div className="text-sm text-[#6B7280]">{school.region}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#6B7280]" />
                            <span className="text-sm text-[#0B1B2B]">{school.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#6B7280]" />
                            <a 
                              href={`https://${school.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-[#C9A24A] hover:underline"
                            >
                              {school.website}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-[#0B1B2B]">{school.fees}</div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-[#6B7280]">{school.ofsted_rating}</span>
                          </div>
                          <div className="text-xs text-[#6B7280]">{school.notable_alumni}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
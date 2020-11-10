# Legacy-of-BrynJolf

A CLI(Node.js) implementation of Legacy of BrynJolf.

## Table of Contents

- [About Legacy Of BrynJolf](#about-legacy-of-brynjolf)
- [Levels of Legcay of BrynJolf](#levels-of-legcay-of-brynjolf)


## About Legacy Of BrynJolf:
  Brynjolf, a legendary thief is known to escape even from the most secure rooms. Over the years, the guards have been tightening their security.
  Fearing the future of younger thieves he decidedto start a school of Larceny.
  
  Brynjolf can move `one step`  either to left, right, up or down.He keeps going through empty space until he hits a wall or reaches the exit. If he reaches the exit he wins.The guards copy Bryjolf's direction and run in the samedirection except they don't go through the exit. Theytreat it like a wall.
  #### Symbols:
  1. **.** Means Empty Space.
  2. **G** Means Guards.
  3. **E** Means Exits.
  4. **B** Means Brynjolf(Player).
  5. **X** Means Wall.

  
 Consider Below Room:
 
               ___ ___ ___ ___
              | . | . | . | X |
               ___ ___ ___ ___
              | . | G | . | X |
               ___ ___ ___ ___
              | . | B | . | E |
               ___ ___ ___ ___
              | . | . | G | . |
               ___ ___ ___ ___


  The exit is to the right of Brynjolf. He runs right and the guards do the same too. He goes out of the exit andleaves. This is how it would look: 
 
             ___ ___ ___ ___
            | . | . | . | X |
             ___ ___ ___ ___
            | . | . | G | X |
             ___ ___ ___ ___
            | . | . | B | E |
             ___ ___ ___ ___
            | . | . | . | G |
             ___ ___ ___ ___

 
If BrynJolf(Player) to right,right He Reaches the Exit than means BrynJolf Won.This is how it would look: 
 
     ___ ___ ___ ___
    | . | . | . | X |
     ___ ___ ___ ___
    | . | . | G | X |
     ___ ___ ___ ___
    | . | . | . | E |
     ___ ___ ___ ___
    | . | . | . | G |
     ___ ___ ___ ___
 
 If BrynJolf(Player) to right,up then Guard Will Catch BrynJolf(Player)  than means BrynJolf was Lose.This is how it would look: 
 
     ___ ___ ___ ___
    | . | . | . | X |
     ___ ___ ___ ___
    | . | . | G | X |
     ___ ___ ___ ___
    | . | . | B | E |
     ___ ___ ___ ___
    | . | . | . | G |
     ___ ___ ___ ___
 
If BrynJolf(Player) to left,left,left,left then Guards and BrynJolf(Player)  are unable to Move than means game was undecided.This is how it would look: 

     ___ ___ ___ ___
    | . | . | . | X |
     ___ ___ ___ ___
    | G | . | . | X |
     ___ ___ ___ ___
    | B | . | . | E |
     ___ ___ ___ ___
    | G | . | . | . |
     ___ ___ ___ ___
     
 ## Levels of Legcay of BrynJolf

 #### Direction Symbols:
  1. **u** to move UP.
  2. **d** to move DOWN.
  3. **r** to Move RIGHT.
  4. **l** to Move LEFT.

#### Probelm1: Establishment:
  Sequunce of movements and room will provided as input and we need to print the room how that room looks at the end.
  Example: 
    input: 
   
      Sequunce of movements: rll
      Room: 
                   ___ ___ ___ ___
                  | . | . | . | X |
                   ___ ___ ___ ___
                  | . | G | . | X |
                   ___ ___ ___ ___
                  | . | B | . | E |
                   ___ ___ ___ ___
                  | . | . | G | . |
                   ___ ___ ___ ___
     
    output:

        Room:
                 ___ ___ ___ ___
                | . | . | . | X |
                 ___ ___ ___ ___
                | G | . | . | X |
                 ___ ___ ___ ___
                | B | . | . | E |
                 ___ ___ ___ ___
                | . | G | . | . |
                 ___ ___ ___ ___

          status: safe
    ```
 
#### Probelm2: EnLightenment:
  1.Sequunce of movements and room will provided as input and we need print the shortest path to win or print status if already given sequence of moveements leads to won or lose or undecided status.
  2.Only Room Data  will provided as input and we need to print the room along with shortest wining path.
  Example for Case 1: 
 
    input: 
   
      Sequunce of movements: rll
      Room: 
                   ___ ___ ___ ___
                  | . | . | . | X |
                   ___ ___ ___ ___
                  | . | G | . | X |
                   ___ ___ ___ ___
                  | . | B | . | E |
                   ___ ___ ___ ___
                  | . | . | G | . |
                   ___ ___ ___ ___
     
    output:

        Room:
                 ___ ___ ___ ___
                | . | . | . | X |
                 ___ ___ ___ ___
                | G | . | . | X |
                 ___ ___ ___ ___
                | B | . | . | E |
                 ___ ___ ___ ___
                | . | G | . | . |
                 ___ ___ ___ ___

          path: rrrr
   Example for Case 2: 
 
    input: 
   
      Sequunce of movements: <empty>
      Room: 
                   ___ ___ ___ ___
                  | . | . | . | X |
                   ___ ___ ___ ___
                  | . | G | . | X |
                   ___ ___ ___ ___
                  | . | B | . | E |
                   ___ ___ ___ ___
                  | . | . | G | . |
                   ___ ___ ___ ___
     
    output:

        Room:
                 ___ ___ ___ ___
                | . | . | . | X |
                 ___ ___ ___ ___
                | .| . | G | X |
                 ___ ___ ___ ___
                | . | . | . | E |
                 ___ ___ ___ ___
                | . | . | G | . |
                 ___ ___ ___ ___

          path: rrr
     
 


## Prerequisites

1. [Node.js](https://nodejs.org) and [npm](https://npmjs.com) installed (verified with npm version 6.14.8 and Node v10.16.0).

## Installation and Basic setup
1. Clone or download this repository.
2. Install dependencies using `npm install`.
3. To build use: `npm run build`.

## How to Run/Start:
You can strart CLI in multiple ways:
1. After Build we can use: `npm start` or `node ./dist/index.js`.
2. Without Build we can use: `npm run dev`.

## Usage

If You start the CLI You will prompt like this: 

```
Welcome to Legacy of BrynJolf
Please Enter : 
 1--> Establishment of the Problem 
 2 --> Enlightenment of the Problem 
 3 --> Exit.

```
You have Choose an option from provided options.




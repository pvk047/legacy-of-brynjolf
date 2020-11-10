# Legacy-of-BrynJolf

A CLI(Node.js) implementation of Legacy of BrynJolf.

## Table of Contents

- [About Legacy Of BrynJolf](#about-legacy-of-brynjolf)
- [Levels of Legcay of BrynJolf](#levels-of-legcay-of-brynjolf)
- [Prerequisites](#prerequisites)
- [Installation and Basic setup](#installation-and-basic-setup)
- [Usage](#usage)


## Prerequisites

1. [Node.js](https://nodejs.org) and [npm](https://npmjs.com) installed (verified with npm version 6.14.8 and Node v10.16.0).

## Installation and Basic setup
1. Clone or download this repository.
2. Install dependencies using `npm install`.
3. To build use: `npm run build`.

## Usage:
### How to Run/Start:
We Can start CLI application in serveral ways as list below:
1. After Build we can use: `npm start` or `node ./dist/index.js`.
2. Without Build we can use: `npm run dev`.

If You start the CLI using above methods You will prompt like this: 

```
Welcome to Legacy of BrynJolf
Please Enter : 
 1 --> to Start Establishment Problem. 
 2 --> to Start Enlightenment Problem 
 3 --> to Exit.
> 
```

Please Refer [About Legacy Of BrynJolf](#probelm1-establishment) to know about Establishment Problem.

Please Refer [About Legacy Of BrynJolf](#probelm2-enlightenment) to know about Enlightenment Problem.

#### If you choose 1 (Establishment Problem):

 Please Refer [About Legacy Of BrynJolf](#probelm1-establishment) to know about Establishment Problem.
 
 You will prompted as below:
 ```
 ****Establish Problem*****
Note: 
 '.' means Empty.'G' means Guard.'X' means Wall.'B' means Brynjolf.'E' means Exit.
 ___ ___ ___ ___
| . | . | . | X |
 ___ ___ ___ ___
| . | G | . | X |
 ___ ___ ___ ___
| . | B | . | E |
 ___ ___ ___ ___
| . | . | G | . |
 ___ ___ ___ ___

 Enter: 
'u' to move up.
'd' to move down.
'l' to move left.
'r' to move right.
Example directions string: 'uud' means move up, move up and move down from the current position of 'B'
Please Enter Movement Directions: 
 ```
Now you have to enter the suqence of movements as per above instructions.

Example: 
You entered `rrrrr` then you will prompted as below: 
```
--------------------Input----------------------------------
Directions:  [ 'r', 'r', 'r', 'r', 'r' ]
 ___ ___ ___ ___
| . | . | . | X |
 ___ ___ ___ ___
| . | G | . | X |
 ___ ___ ___ ___
| . | B | . | E |
 ___ ___ ___ ___
| . | . | G | . |
 ___ ___ ___ ___
--------------------Result----------------------------------
 ___ ___ ___ ___
| . | . | . | X |
 ___ ___ ___ ___
| . | . | G | X |
 ___ ___ ___ ___
| . | . | . | E |
 ___ ___ ___ ___
| . | . | . | G |
 ___ ___ ___ ___

Result: win:executed 2 of 5
```

#### If you choose 2 (Enlightenment Problem.):

Please Refer [About Legacy Of BrynJolf](#probelm2-enlightenment) to know about Enlightenment Problem.
 
 You will prompted as below:
 ```
 ****Establish Problem*****
Note: 
 '.' means Empty.'G' means Guard.'X' means Wall.'B' means Brynjolf.'E' means Exit.
 ___ ___ ___ ___
| . | . | . | X |
 ___ ___ ___ ___
| . | G | . | X |
 ___ ___ ___ ___
| . | B | . | E |
 ___ ___ ___ ___
| . | . | G | . |
 ___ ___ ___ ___

 Enter: 
'u' to move up.
'd' to move down.
'l' to move left.
'r' to move right.
Example directions string: 'uud' means move up, move up and move down from the current position of 'B'
Please Enter Movement Directions: 
 ```
Now you have to enter the suqence of movements as per above instructions.

Example: 
You entered `rrrrr` then you will prompted as below: 
```
--------------------Input----------------------------------
Directions:  [ 'r', 'r', 'r', 'r', 'r' ]
 ___ ___ ___ ___
| . | . | . | X |
 ___ ___ ___ ___
| . | G | . | X |
 ___ ___ ___ ___
| . | B | . | E |
 ___ ___ ___ ___
| . | . | G | . |
 ___ ___ ___ ___
--------------------Result----------------------------------
 ___ ___ ___ ___
| . | . | . | X |
 ___ ___ ___ ___
| . | . | G | X |
 ___ ___ ___ ___
| . | . | . | E |
 ___ ___ ___ ___
| . | . | . | G |
 ___ ___ ___ ___

Result: win:executed 2 of 5
```

#### If you choose 3(Exit):
You will prompted with Bye and Exits(closes) this Application.



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
     
 






;**** Timer **** 
TSCR1 EQU $46
TSCR2 EQU $4D
TIOS  EQU $40
TCTL1 EQU $48
TCTL2 EQU $49
TFLG1 EQU $4E
TIE   EQU $4C
TSCNT EQU $44
TC4	  EQU $58
TC1	  EQU $52
;***************

;*** PORTS **** 
DDRA  EQU $02
PORTA EQU $00
PORTB EQU $01
DDRB  EQU $03
PUCR  EQU $0C
PORTM EQU $0250
DDRM  EQU $0252
PORTK EQU $32
DDRK EQU  $33
;**************

;*** ADC Unit *** 
ATDCTL2	EQU $122
ATDCTL4 EQU $124
ATDCTL5	EQU $125
ADTSTAT0 EQU $126
ATD1DR1H EQU $132
ADT1DR1L EQU $133
;***************

.hc12

	ORG $1000
BASELINE ds 2      ;Variable to hold baseline brightness
DutyCycle ds 2     ; Dutycycle for PWM wave for oscilloscope. Has standard value of 512 but changes based on fraction
FRACTION ds 2      ; Fraction that is calculated to subtract from dutycycle to show whether to brighten or dim lights based on ambient light.
COUNTER ds 2	   ; Counter value to wait to sample light again
COMPARE ds 2
KEYPAD ds 1
	ORG	 $400
	LDS #$4000

	LDAA #%11000000 ;Initialization of A/D converter
	STAA ATDCTL2

	JSR Delay1MS

	LDAA #%11100101; Initialize ADTCTL4
	STAA ATDCTL4
	
	LDAA #$FF; Initialize port A for output (LED)
	STAA DDRA
	LDAA #0
	STAA PORTA

	LDAA #$00 ;initialize port B for use with the keypad
	STAA DDRB
	LDAA #0
	STAA PORTB
	
	LDAA #$5  ;Load default keypad (baseline) value of 5
	STAA KEYPAD
	
	LDAA #$FF ;Initialize Port K for the oscilloscope
	STAA DDRK
	LDAA #$0
	STAA PORTK
	
	lds #$4000
				ldaa #$0F
				staa $03 ; Set port B for in[7..4], out[3..0]
				ldaa #$FF 
				staa $02  ; Set port A for output only
				bra ReScan
				
;FIX:			ldaa KEYPAD
;				ldab KEYPAD
;				lbra DONE
				
ReScan:			des	 ; Create room on the stack for the return value
				jsr ScanOnce  ; Do one scan of the keypad
				pula		  ; Get the return value
				cmpa #$FF	  ; Invalid return value
				beq ReScan
				psha	  	  ; Store the current return value
				
				staa KEYPAD
				
				ldy #!50  	  ; 50 ms debounce delay
				pshy
				jsr Delay
				ins		 	  ; Only clean up one byte, since we need RValue
				jsr ScanOnce  ; Do another scan
				pula		  ; Get the return value
				pulb		  ; Get the previous return value
				cba			  ; Are they the same?
				bne ReScan	  ; If not, do nothing
				
				
				
				cmpa #$0		;Compare binary keypad value to determine how many leds need to light up
				BEQ Change0
				cmpa #$1
				BEQ Change1
				cmpa #$2
				BEQ Change2
				cmpa #$3
				BEQ Change3
				cmpa #$4
				BEQ Change4
				cmpa #$5
				BEQ Change5
				cmpa #$6
				BEQ Change6
				cmpa #$7
				BEQ Change7
				cmpa #$8
				BEQ Change8
				
				;ldaa KEYPAD
				;ldaa #%00011111
				;ldx #$168
				;stx BASELINE
				;JSR Set
				 
				;JSR Set
				
				;DEF
				;ldx #$128
				;stx BASELINE
				;JSR Set
				

Change0:		ldaa #%00000000  ;Storing number of led values that need to be turned on as well as setting the baseline value
				ldab #$28		 
				stab BASELINE
				JSR Set
Change1:		ldaa #%00000001
				ldab #$56
				stab BASELINE
				JSR Set
Change2:		ldaa #%00000011
				LDAB #$84
				STAB BASELINE	 
				JSR Set
Change3:		ldaa #%00000111
				ldx #$112
				stx BASELINE
				JSR Set
Change4:		ldaa #%00001111
				ldx #$140
				stx BASELINE
				JSR Set
Change5:		ldaa #%00011111
				ldx #$168
				stx BASELINE
				JSR Set
Change6:		ldaa #%00111111
				ldx #$196
				stx BASELINE
				JSR Set
Change7:		ldaa #%01111111
				ldx #$224
				stx BASELINE
				JSR Set
Change8:		ldaa #%11111111
				ldx #$250
				stx BASELINE
				JSR Set
				
Set:			staa $0		  ; Else, write to the LED bank.
				lbra DONE	  ;Branch to set oscilloscope
				
weBACK:			ldaa #$0F 
				staa $03 ; Set port B for in[7..4], out[3..0]
				ldaa #$FF 
				staa $02 
				lbra ReScan ;Branch to scan for next key input
				
										
ScanOnce:       clrb
top1:            ldx #OutputMasks	; This lookup table contains the
                ldaa b,x			; single-zero outputs for the
                staa $1				; columns
				jsr Delay1MSone		; Wait so the output can settle
                ldaa $1				; Read the input
                lsra 				; Shift right four times.  The rows
                lsra				; are in the high order bits
                lsra
                lsra
                anda #$0F			; Input $F means no key pressed
                cmpa #$0F			; Input anything else means keypressed
                beq next_test		; On $F, move to the next column
                ldx #ColAddr		; On not-$F, load the current column
                ldy b,x				; look-up table
                ldaa a,y; At this point, A contains the solution
				tsx
                staa 2,x  	 	  	; Write the answer to the stack
				rts	 				; and return
next_test:      incb				; We need to increment twice so B will 
                incb				; properly index the row and column tables
                cmpb #8				; When B reaches 8, we're done
                blt top1
                ldaa KEYPAD ;ldaa #$FF			; If B reached 8, return $FF to indicate
				tsx	 				; no key pressed
				staa 2,x
				;ldaa KEYPAD
				;ldab KEYPAD
				;lbra DONE
				rts                

; OK.  Valid values are single zeros, so that's 7, B, D, E.  Others fault                
ColOne:         db  $FF,$FF,$FF,$FF,$FF,$FF,$FF,$0A,$FF,$FF,$FF,$07,$FF,$04,$01,$FF
ColTwo:         db  $FF,$FF,$FF,$FF,$FF,$FF,$FF,$00,$FF,$FF,$FF,$08,$FF,$05,$02,$FF
ColThree:       db  $FF,$FF,$FF,$FF,$FF,$FF,$FF,$0B,$FF,$FF,$FF,$09,$FF,$06,$03,$FF
ColFour:        db  $FF,$FF,$FF,$FF,$FF,$FF,$FF,$0C,$FF,$FF,$FF,$0D,$FF,$0E,$0F,$FF

ColAddr:        dw  ColOne,ColTwo,ColThree,ColFour

; Output mask must be padded, so we can step by 2s through the ColAddr array
OutputMasks:    db $E,$FF,$D,$Ff,$B,$FF,$7,$FF

Delay1MSone:       ldx #!2000	; This is a magic number.  Modify to change delay
DelayLoop:      dex			; time.
                bne DelayLoop
                rts

Delay:          tsx
                ldy 2,x		 ; The decrement can't be done in place.
                dey	   		 ; DEC 2,X is a one byte operation
                sty 2,x		 ; That's why I use Y as a temp.
                beq DelayEnd
                jsr Delay1MSone
                bra Delay
DelayEnd        rts                        



LEDS:	 BRCLR ADTSTAT0,%10000000,* ;Wait for conversion to be complete
	LBRA weBACK					;Check for new keypad input
						
		

		
DONE 
	 STAA PORTK	
	 STAA BASELINE
	 
	 LDAA #%11000000 ;Now we want to sample the potentiometer voltage, not the keypad
	 STAA ATDCTL5
	 
	 LDD #!512    ;Standard dutycycle
	 STD DutyCycle
	 
	 LDAA ADT1DR1L ;Load the abmient light value (pot voltage)
	 CMPA BASELINE ;Compare to baseline
	 BLO BRIGHTER  ;If ambient light is lower than the desired light, the lights must brighten
	 		;Otherwise, they must dim (or nothing: very unlikely)
	 LDAB ADT1DR1L  ;Load ambient value into B
	 SUBB BASELINE	;Subtract baseline value to get fraction of which change needs to occur
	 LDAA #2 
	 MUL   ;Multiply by two because the number will be 0-255, want 0-512 
	 STD FRACTION ;Store as fraction
	 LDD DutyCycle  ;Load duty cycle and subtract fraction (dutycycle<512 means light has to dim)
	 SUBD FRACTION
	 STD DutyCycle
	 LDD #$FFFF ;Random value to put into counter (about 65ms right now)
	 STD COUNTER

	
SCOPE  ;This section is simply for the oscilloscope, its straight from lab two.
	;Loops as many times as the counter takes
	   LDD TSCNT
		ADDD DutyCycle
		STD TC4
		LDAA #$02
		STAA TCTL1
		BRCLR TFLG1,%00010000,*

		LDD TSCNT
		ADDD #!1024
		SUBD DutyCycle
		STD TC4
		LDAA #$03
		STAA TCTL1
		LDAA BASELINE
		BRCLR TFLG1,%00010000,*
		DEC COUNTER
		BEQ LEDS		;Branch back to potentiometer changes (ambient light)
		BRA SCOPE
		
	 

BRIGHTER LDAB BASELINE ;Exact same as dimming part but backwards (adds fraction to show need to brighten)
		 SUBB ADT1DR1L
		 LDAA #2
	 	 MUL
	 	 STD FRACTION
	 	 LDD DutyCycle
	 	 ADDD FRACTION
		 STD DutyCycle
		 LDD #$FFFF
	 	 STD COUNTER
		 BRA SCOPE
	 
	 
Delay1MS	LDAA #$90			;Basic 1ms delay using the timer
			STAA TSCR1

			LDAA #$03
			STAA TSCR2

			LDAA #$10
			STAA TIOS

			LDAA #$01
			STAA TCTL1

			LDD #$0
			STD TSCNT
			
			LDD TSCNT
			ADDD #!1000
			STD TC4
			BRCLR TFLG1,%00010000,*
			RTS

لقد أرسلت
الجزء التاني
/*******************************************************************************
 System Interrupts File

  File Name:
    system_interrupt.c

  Summary:
    Raw ISR definitions.

  Description:
    This file contains a definitions of the raw ISRs required to support the
    interrupt sub-system.

  Summary:
    This file contains source code for the interrupt vector functions in the
    system.

  Description:
    This file contains source code for the interrupt vector functions in the
    system.  It implements the system and part specific vector "stub" functions
    from which the individual "Tasks" functions are called for any modules
    executing interrupt-driven in the MPLAB Harmony system.

  Remarks:
    This file requires access to the systemObjects global data structure that
    contains the object handles to all MPLAB Harmony module objects executing
    interrupt-driven in the system.  These handles are passed into the individual
    module "Tasks" functions to identify the instance of the module to maintain.
 *******************************************************************************/

// DOM-IGNORE-BEGIN
/*******************************************************************************
Copyright (c) 2011-2014 released Microchip Technology Inc.  All rights reserved.

Microchip licenses to you the right to use, modify, copy and distribute
Software only when embedded on a Microchip microcontroller or digital signal
controller that is integrated into your product or third party product
(pursuant to the sublicense terms in the accompanying license agreement).

You should refer to the license agreement accompanying this Software for
additional information regarding your rights and obligations.

SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND,
EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION, ANY WARRANTY OF
MERCHANTABILITY, TITLE, NON-INFRINGEMENT AND FITNESS FOR A PARTICULAR PURPOSE.
IN NO EVENT SHALL MICROCHIP OR ITS LICENSORS BE LIABLE OR OBLIGATED UNDER
CONTRACT, NEGLIGENCE, STRICT LIABILITY, CONTRIBUTION, BREACH OF WARRANTY, OR
OTHER LEGAL EQUITABLE THEORY ANY DIRECT OR INDIRECT DAMAGES OR EXPENSES
INCLUDING BUT NOT LIMITED TO ANY INCIDENTAL, SPECIAL, INDIRECT, PUNITIVE OR
CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST DATA, COST OF PROCUREMENT OF
SUBSTITUTE GOODS, TECHNOLOGY, SERVICES, OR ANY CLAIMS BY THIRD PARTIES
(INCLUDING BUT NOT LIMITED TO ANY DEFENSE THEREOF), OR OTHER SIMILAR COSTS.
 *******************************************************************************/
// DOM-IGNORE-END

// ***************************************************************************
// ***************************************************************************
// Section: Included Files
// ***************************************************************************
// ***************************************************************************

#include "system/common/sys_common.h"
#include "app.h"
#include "system_definitions.h"

// ***************************************************************************
// ***************************************************************************
// Section: System Interrupt Vector Functions
// ***************************************************************************
// ***************************************************************************
int count = 19;
void __ISR(_CHANGE_NOTICE_VECTOR, ipl1AUTO) _IntHandlerChangeNotification(void)
{
    if(PORTGbits.RG7 == 0 && PORTGbits.RG6 == 0){
        DRV_OC0_PulseWidthSet(10);
    }
    
    else if(PORTGbits.RG6 == 1 && PORTGbits.RG7 == 0){
//        LATG = 0x1000;
//        if(count >= 38){
//            count = 38;
//        } else{
//            count += 2;
//        }
        
        DRV_OC0_PulseWidthSet(19);
    }
    
    else if(PORTGbits.RG7 == 1 && PORTGbits.RG6 == 0){
//        LATG = 0x5000;
//        if(count <= 19){
//            count = 19;
//        }
//        else {
//            count -=2;
//        }
        DRV_OC0_PulseWidthSet(28);
    }
    
    else if(PORTGbits.RG7 == 1 && PORTGbits.RG6 == 1){
        DRV_OC0_PulseWidthSet(36);
    }
    /* TODO: Add code to process interrupt here */
    PLIB_INT_SourceFlagClear(INT_ID_0, INT_SOURCE_CHANGE_NOTICE);
}

 

void __ISR(_TIMER_2_VECTOR, ipl1AUTO) IntHandlerDrvTmrInstance0(void)
{
    
    PLIB_INT_SourceFlagClear(INT_ID_0,INT_SOURCE_TIMER_2);
}
 
void __ISR(_OUTPUT_COMPARE_2_VECTOR, ipl1AUTO) _IntHandlerDrvOCInstance0(void)
{
    LATG = 0x4000;
    PLIB_INT_SourceFlagClear(INT_ID_0, INT_SOURCE_OUTPUT_COMPARE_2);
}
/*******************************************************************************
 End of File
*/
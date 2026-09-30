export const SIMULATION_META = {
  id: 'research-puzzle-v1',
  title: 'The Research Puzzle',
  lab: 'Research Leadership Lab 01',
  subtitle: 'Developing explanations when the evidence becomes more complicated',
  duration: '25–35 minutes',
};

export const INITIAL_CONTEXT = {
  heading: 'The research problem',
  paragraphs: [
    'You are developing a study of how organisations respond when their established ways of working are disrupted.',
    'An initial review identifies two organisations in the same sector. For the purposes of the simulation, they are called Northbridge and Westford.',
    'Both are medium-sized organisations providing employment and skills services. They operate across several locations and work with employers, public bodies and individual service users.',
  ],
  comparison: [
    ['Employees', '438', '471'],
    ['Operating locations', '11', '12'],
    ['Annual income', '£31.4m', '£33.1m'],
    ['Senior leadership team', '7', '8'],
    ['Main service model', 'Regional delivery', 'Regional delivery'],
    ['Financial position', 'Stable', 'Stable'],
  ],
  note: 'Neither organisation had recently experienced a major financial crisis or significant restructuring.',
};

export const DECISIONS = [
  {
    id:'d1',
    label:'Decision 1 of 8',
    title:'Where would you begin?',
    stage:'Starting the inquiry',
    evidenceTitle:'The disruption',
    evidence:[
      'A change in government contracting requirements gives both organisations twelve weeks to redesign a substantial part of their service.',
      'The change affects how services are delivered, how performance is recorded, relationships with external partners, staff responsibilities and several existing contracts.',
      'Six weeks after the announcement, Northbridge has reorganised work across several teams, moved some decisions closer to operational staff and maintained most services. Westford is still considering proposed changes, two external partners have requested clarification and one service has been temporarily suspended.',
      'These observations establish that the organisations responded differently. They do not establish why.'
    ],
    prompt:'You have limited time for the first stage of the study. Which approach would you take?',
    options:[
      {
        id:'a', label:'Develop a provisional explanation for the difference and use the next stage of evidence collection to assess it.',
        baseFeedback:{
          value:'A provisional explanation can give the study an early direction and help you decide what evidence may be useful.',
          consider:'The explanation still needs to remain provisional. Later evidence may support it, require it to be revised or point towards another explanation.'
        },
        reasons:[
          ['a1','I wanted the study to have a clear direction.','Your reasoning suggests that focus was important to you. Giving a study direction can make the next stage more purposeful, provided that the direction can still change when the evidence requires it.'],
          ['a2','A provisional explanation would help me decide what evidence to collect.','You were using the explanation as a guide for evidence collection. This can make data collection more focused because you can ask what information would support, weaken or change the explanation.'],
          ['a3','The information already appeared to suggest a likely explanation.','You felt the early information already pointed towards an explanation. The useful question from this point is what evidence would be strong enough to make you reconsider that first view.'],
          ['a4','I wanted to make progress without collecting information that might not be useful.','You were balancing progress with the need for evidence. This can be useful in a study with limited time or access, provided that efficiency does not narrow the inquiry before important alternatives have been considered.']
        ],
        signals:{FOC:1,PROG:1}
      },
      {
        id:'b', label:'Identify several explanations that could plausibly account for the difference and consider what evidence would help you distinguish between them.',
        baseFeedback:{
          value:'Considering several explanations can reduce early commitment to one account and make later evidence more useful for comparison.',
          consider:'A study can generate many plausible explanations. At some point, you will need to decide which explanations deserve closer attention and what evidence would help distinguish between them.'
        },
        reasons:[
          ['b1','I wanted to avoid becoming committed to one explanation too early.','You were deliberately keeping alternative explanations available. This can help prevent the first plausible account from becoming the only account considered.'],
          ['b2','Several explanations seemed plausible.','You recognised that the same early observations could support more than one explanation. The next challenge is to identify evidence that would separate those possibilities.'],
          ['b3','I wanted to identify evidence that could help distinguish between the explanations.','You were already thinking about how evidence could be used to decide between alternatives, rather than simply collecting more information.'],
          ['b4','I did not think there was enough information to favour one explanation.','You were cautious about giving one explanation priority. This can be appropriate at an early stage, although the study will eventually need criteria for deciding when the evidence is sufficient to focus the inquiry.']
        ],
        signals:{ALT:2,EXPL:1}
      },
      {
        id:'c', label:'Develop a fuller account of what happened in each organisation before deciding which explanations need closer investigation.',
        baseFeedback:{
          value:'A fuller account can reduce the risk of developing an explanation around an incomplete understanding of the situation.',
          consider:'Additional information does not automatically lead to a clearer explanation. As the evidence grows, you will need to decide which parts help explain the difference and which mainly add description.'
        },
        reasons:[
          ['c1','I wanted to understand the context before developing an explanation.','You gave priority to understanding the setting in which the difference occurred. Context may be important where similar organisations respond differently under apparently similar conditions.'],
          ['c2','Important information might still be missing.','You were alert to gaps in the available evidence. This can help prevent an early explanation from being built around what happened to be visible first.'],
          ['c3','I did not yet have enough confidence to develop an explanation.','You wanted a stronger evidence base before committing to an explanation. The question to keep in view is what level of information would be enough to move the inquiry forward provisionally.'],
          ['c4','I wanted to understand what happened before asking why it happened.','You were separating description from explanation. Establishing what happened can provide a useful basis for later asking how and why the difference arose.']
        ],
        signals:{CONT:1,DIV:1}
      }
    ],
    reflection:'What did you hope your approach would help you understand?',
    transition:'You now begin collecting evidence from both organisations.'
  },
  {
    id:'d2',
    label:'Decision 2 of 8',
    title:'Whose account do you need?',
    stage:'Choosing evidence',
    evidenceTitle:'Evidence round 1',
    evidence:[
      'You interview two senior managers and the head of operations in each organisation. You also review internal communications, meeting records and changes made to staffing and service arrangements.',
      'Northbridge’s Chief Executive says: “We knew we could not wait for a complete picture. The regional teams were already seeing different effects. We agreed the broad principles and allowed them to make some decisions locally.”',
      'A Northbridge Regional Manager says: “There was uncertainty, but we knew where to take problems. People from operations, finance and IT were already talking to one another.”',
      'Westford’s Chief Executive says: “The guidance kept changing. We did not want different regions developing arrangements that we might later have to reverse.”',
      'Westford’s Operations Director says: “There were different views about the scale of the change. Some people wanted to move immediately. Others thought we should wait until the contracting authority provided more detail.”',
      'During the first six weeks Northbridge held six senior leadership meetings, eleven cross-functional operational meetings and eighteen regional implementation meetings. Westford held nine senior leadership meetings, three cross-functional operational meetings and seven regional implementation meetings.',
      'The meeting figures show differences in activity. They do not show whether the meetings were useful, who influenced decisions or whether meeting frequency affected the outcome.'
    ],
    prompt:'You can extend one part of the data collection before completing the first stage of analysis. What would you prioritise?',
    options:[
      {
        id:'a', label:'Conduct further interviews with senior managers to understand how the main decisions were made.',
        baseFeedback:{value:'Further senior-management interviews could clarify how key decisions were made, what leaders intended and where disagreement arose.',consider:'Senior managers provide an important perspective, but their accounts do not necessarily show how decisions were understood or put into practice elsewhere in the organisation.'},
        reasons:[
          ['a1','I wanted to understand how the key decisions were made.','Your priority was the decision process itself. Further senior interviews could be appropriate if leadership decision-making is the part of the explanation you are trying to understand.'],
          ['a2','I wanted to understand what senior leaders were trying to achieve.','You were distinguishing intended action from observed outcomes. This can be useful, but later evidence may still be needed to establish what happened after those intentions were communicated.'],
          ['a3','I wanted to see whether senior leaders agreed about what happened.','You were interested in differences within the senior account, rather than treating management as a single perspective. That can provide a more careful understanding of leadership decision-making.'],
          ['a4','I considered senior managers the best-informed people in the organisations.','You gave greater weight to senior managers as sources of information. It may be useful later to consider what they can observe directly and what may be more visible to people working elsewhere in the organisation.']
        ],
        signals:{EXPL:1}
      },
      {
        id:'b', label:'Collect evidence from people at different organisational levels to compare senior decisions with how those decisions were understood and acted upon.',
        baseFeedback:{value:'Evidence from different organisational levels can help you compare formal decisions with how those decisions were understood and put into practice.',consider:'Different accounts do not necessarily mean that one group is correct and another is mistaken. People may have different information or experience different parts of the same process.'},
        reasons:[
          ['b1','I wanted to compare what leaders intended with what happened in practice.','You were interested in the relationship between decisions and implementation. This moves the inquiry towards understanding how the organisational response developed.'],
          ['b2','I wanted to understand how different groups experienced the disruption.','You were broadening the study beyond the perspective of senior management. This may reveal differences in how the same organisational response was experienced.'],
          ['b3','I wanted to avoid relying on one organisational perspective.','You were deliberately seeking more than one account. This can help identify where interpretations converge and where they differ.'],
          ['b4','I wanted to understand how decisions were communicated.','You were focusing on how information moved through the organisation. This may become important if communication influenced how quickly people could respond.']
        ],
        signals:{DIV:2,EXPL:1}
      },
      {
        id:'c', label:'Prioritise operational and performance evidence to establish the extent of the difference between the organisations more clearly.',
        baseFeedback:{value:'Operational evidence can help establish whether the outcome difference is as substantial as the initial accounts suggest.',consider:'Outcome evidence can show what changed, but it may not explain how or why the difference arose. Process evidence may still be needed later.'},
        reasons:[
          ['c1','I wanted to establish more clearly whether the outcomes were genuinely different.','You were checking that the phenomenon itself was sufficiently established before explaining it. That is a deliberate research sequence.'],
          ['c2','I wanted evidence that did not depend on people’s accounts of what happened.','You were seeking evidence from a different source. It may still be useful to consider that operational data and interview accounts answer different questions.'],
          ['c3','I thought the outcome should be established before trying to explain it.','You were separating the task of establishing the difference from the task of explaining it. This can provide a clearer basis for later explanation.'],
          ['c4','I considered performance evidence more reliable than interview evidence.','You gave greater weight to one form of evidence. As the study develops, it may be useful to consider what each form of evidence can and cannot establish.']
        ],
        signals:{CAL:1,PROG:1}
      }
    ],
    reflection:'What do you think is currently missing from the evidence?',
    transition:'While reviewing organisational records, you find information that complicates the emerging account.'
  },
  {
    id:'d3',
    label:'Decision 3 of 8',
    title:'What do you do with evidence that does not fit neatly?',
    stage:'Responding to new information',
    evidenceTitle:'Evidence round 2',
    evidence:[
      'Westford experienced another major contractual change three years earlier.',
      'During that period, a revised service model was agreed within three weeks, regional managers were permitted to adapt implementation locally, all major contractual deadlines were met and an external review subsequently described the transition as effective.',
      'A senior manager who worked at Westford during both periods tells you: “People now talk as though Westford has always been slow to change. That isn’t my experience. We handled the previous transition well. Something is different this time.”',
      'The evidence does not show what changed. It does make a simple explanation based on stable differences between Northbridge and Westford more difficult to sustain.'
    ],
    prompt:'Suppose your emerging explanation has given considerable attention to differences in leadership between Northbridge and Westford. What would you do?',
    options:[
      {
        id:'a', label:'Retain the leadership explanation for now and investigate why Westford responded differently during the earlier disruption.',
        baseFeedback:{value:'Retaining an explanation while investigating an inconsistency can be appropriate when one observation is not enough to reject the wider account.',consider:'The inconsistency still requires explanation. Treating evidence as an exception is not sufficient unless the study can show why the circumstances differ in a way that matters.'},
        reasons:[
          ['a1','One different case is not enough to reject it.','You were judging the new evidence proportionately rather than allowing one case to overturn the explanation immediately.'],
          ['a2','The circumstances may have been different.','You were directing attention towards context. The next useful question is which differences between the two periods could reasonably affect the explanation.'],
          ['a3','Leadership still appears to be the most convincing explanation.','You retained confidence in the existing explanation. The important test now is whether later evidence is considered on the same terms when it supports or challenges that view.'],
          ['a4','I would want to understand the inconsistency before changing direction.','You were treating the inconsistency as something to investigate. This leaves room for the explanation to be retained, refined or rejected on the basis of further evidence.']
        ],
        signals:{REV:1,CONT:1}
      },
      {
        id:'b', label:'Reconsider whether differences in leadership alone can explain the current outcome.',
        baseFeedback:{value:'The historical evidence gives you a reason to reconsider whether leadership quality alone can explain why the same organisation responded differently at different times.',consider:'Reconsidering an explanation does not require abandoning everything already learned. Some parts may remain useful within a more complete account.'},
        reasons:[
          ['b1','The same organisation had behaved differently at another time.','You treated variation within the same organisation as important evidence. This shifts attention towards what changed between the two periods.'],
          ['b2','It suggested that leadership quality might not be stable across situations.','You were questioning whether a stable characteristic of leadership could account for a changing organisational response.'],
          ['b3','It made me wonder what had changed between the two periods.','You used the inconsistency to generate a more specific comparative question.'],
          ['b4','It weakened my confidence in the explanation.','You allowed new information to change how strongly you held the emerging account.']
        ],
        signals:{REV:2,ALT:1,EXPL:1}
      },
      {
        id:'c', label:'Set the leadership explanation aside and begin investigating alternative explanations.',
        baseFeedback:{value:'Setting an explanation aside can prevent later evidence from being forced into an account that no longer seems adequate.',consider:'One contradictory observation does not necessarily invalidate every part of an explanation. It may sometimes be more useful to ask what needs to change within the account.'},
        reasons:[
          ['c1','I thought the new evidence contradicted it.','You gave substantial weight to the historical evidence. Later stages will help show whether replacement or refinement provides the better account.'],
          ['c2','I no longer thought leadership was the most useful explanation.','You were comparing the explanatory value of different possible accounts.'],
          ['c3','I wanted to avoid trying to make new evidence fit the existing explanation.','You were alert to the risk of preserving an explanation by reinterpreting inconvenient information.'],
          ['c4','I thought another explanation would probably be stronger.','You were prepared to change direction, although the new explanation will still need evidence of its own.']
        ],
        signals:{REV:2,ALT:1}
      }
    ],
    reflection:'What would you need to know before deciding whether the earlier case changes your explanation?',
    transition:'You compare organisational arrangements during the two periods more closely.'
  },
  {
    id:'d4',
    label:'Decision 4 of 8',
    title:'How would you now refine the research question?',
    stage:'Refining the question',
    evidenceTitle:'Evidence round 3',
    evidence:[
      'Eighteen months before the current disruption, Northbridge created an Operations Forum that normally met once each month. Its membership included senior managers, regional managers, finance, IT, workforce planning and service-delivery representatives.',
      'During the disruption, the forum began meeting twice each week. Meeting records show that regional information was discussed alongside contractual requirements. Regional managers could approve some temporary operational changes within agreed limits.',
      'Westford did not have an equivalent standing forum during the current disruption. A temporary response group was created in week four, consisted mainly of senior managers and generally required senior approval for service changes.',
      'During Westford’s earlier successful transition, however, it had operated a temporary implementation group involving regional managers and service leads. Several members described it as having considerable freedom to resolve operational problems. The group was disbanded when that transition ended.'
    ],
    prompt:'Which question would you pursue at this stage?',
    options:[
      {
        id:'a', label:'Why was leadership at Northbridge more effective during the disruption?',
        baseFeedback:{value:'Leadership remains a plausible part of the explanation. The evidence contains differences in judgement, decision-making and willingness to delegate.',consider:'The organisational arrangements now appear to shape what leaders and operational staff could do. A leadership-focused question may therefore capture only part of the process.'},
        reasons:[
          ['a1','Leadership decisions still appear to account for important differences.','You continue to see leadership decisions as central to the explanation. Later evidence can help establish whether those decisions operated independently of organisational arrangements.'],
          ['a2','I think organisational arrangements reflect leadership choices.','You are treating structures and leadership as connected rather than independent. This can support a broader explanation if the relationship is made explicit.'],
          ['a3','I do not yet think there is enough evidence to change the focus.','You are applying a relatively high threshold before changing the question. The next stage can help determine whether the current evidence is sufficient to refine it.'],
          ['a4','Leadership is the main subject I am interested in.','Your theoretical interest is shaping the question. That is legitimate, provided the study still accounts for evidence that may not fit a leadership-centred explanation.']
        ],
        signals:{EXPL:1}
      },
      {
        id:'b', label:'How did arrangements for sharing information and making decisions affect how the organisations responded?',
        baseFeedback:{value:'This question focuses more directly on a possible process connecting organisational arrangements with the different responses.',consider:'The evidence does not yet establish that these arrangements caused the outcomes. Other explanations remain possible, and the next stage needs to examine the account more carefully.'},
        reasons:[
          ['b1','The evidence suggested that information moved differently through the organisations.','You were using the evidence to refine the question around an observed process.'],
          ['b2','The existing arrangements appeared to affect what leaders and staff could do.','You were considering how organisational structures may shape action rather than treating outcomes as the result of individuals alone.'],
          ['b3','This question seemed to explain more of the evidence.','You selected the question because it accounted for a wider range of observations across the cases.'],
          ['b4','I wanted to understand the process through which the different outcomes arose.','You were moving from describing the difference towards explaining how it may have developed.']
        ],
        signals:{EXPL:2,FOC:1}
      },
      {
        id:'c', label:'Why did Northbridge achieve better operational outcomes than Westford?',
        baseFeedback:{value:'This keeps the outcome difference at the centre of the study and avoids making the question more specific than the evidence warrants.',consider:'The question still permits many different explanations. As the study develops, you will need to decide which process or condition deserves closer examination.'},
        reasons:[
          ['c1','I want to establish the outcome more clearly before explaining it.','You are sequencing the research so that the difference is established before a more specific explanation is developed.'],
          ['c2','I do not think the evidence yet supports a more specific explanation.','You are keeping the claim close to what you think the evidence can support.'],
          ['c3','The outcome itself is my main research interest.','Your research interest is centred on explaining variation in the outcome. The next step is to determine how much explanatory detail the study needs.'],
          ['c4','I want to avoid building too much into the research question.','You are keeping the question relatively open. This can preserve flexibility, although it may also require clearer criteria for deciding what evidence matters most.']
        ],
        signals:{CAL:1}
      }
    ],
    reflection:'What are you now trying to explain, and what has changed in your understanding since the beginning of the study?',
    transition:'You now have to decide what additional comparison would be most useful for examining the emerging explanation.'
  },
  {
    id:'d5',
    label:'Decision 5 of 8',
    title:'What additional comparison would be most useful?',
    stage:'Examining the explanation',
    evidenceTitle:'The emerging explanation',
    evidence:[
      'Your analysis now gives greater attention to coordination and information sharing.',
      'A working explanation is that established arrangements for sharing information and coordinating decisions may have contributed to Northbridge’s response.',
      'Resources allow you to examine one additional organisation.'
    ],
    prompt:'Which organisation would you choose to investigate next?',
    options:[
      {
        id:'a', label:'An organisation with established coordination arrangements that also responded effectively.',
        baseFeedback:{value:'A case showing the same pattern could indicate that the relationship is not unique to Northbridge.',consider:'A case that fits the explanation provides less information about when the explanation might fail or what other conditions may be required.'},
        reasons:[
          ['a1','I wanted to know whether the same pattern appeared in another organisation.','You were interested in whether the pattern could be observed again. This can strengthen confidence that the relationship is worth further investigation.'],
          ['a2','I wanted to know whether the explanation might apply more widely.','You were considering whether the emerging account could extend beyond the original comparison.'],
          ['a3','I wanted to know whether Northbridge was unusual.','You were using another case to judge how distinctive the original organisation was.'],
          ['a4','It would give me greater confidence in the explanation.','You were seeking additional support for the explanation. Later evidence that does not fit the pattern may provide a different kind of information.']
        ],
        signals:{}
      },
      {
        id:'b', label:'An organisation with established coordination arrangements that responded poorly.',
        baseFeedback:{value:'This case could show whether coordination is sufficient to explain an effective response and may identify conditions that the current explanation is missing.',consider:'A case that challenges an explanation does not automatically disprove it. Its value lies in showing what else may need to be considered.'},
        reasons:[
          ['b1','I wanted to know whether coordination was sufficient to explain the outcome.','You were examining whether the proposed factor could account for the outcome on its own.'],
          ['b2','I wanted to identify circumstances in which the explanation might not hold.','You were considering the conditions under which the explanation may apply.'],
          ['b3','I thought another factor might matter.','You were looking for evidence that could reveal something missing from the current explanation.'],
          ['b4','I deliberately wanted evidence that might challenge the explanation.','You were actively testing whether your preferred explanation could withstand contrary evidence.']
        ],
        signals:{CHAL:2,COND:1}
      },
      {
        id:'c', label:'An organisation without established coordination arrangements that also responded poorly.',
        baseFeedback:{value:'A case showing weak coordination and a poor response could provide another example consistent with the emerging pattern.',consider:'Because the proposed factor and outcome move together in the expected direction, the case does less to show whether another condition could be responsible.'},
        reasons:[
          ['c1','I wanted to know whether weak coordination was also associated with poor responses elsewhere.','You were interested in whether the relationship appeared in another case.'],
          ['c2','I wanted to know whether the same pattern appeared in another setting.','You were looking for repetition across settings.'],
          ['c3','I wanted to know whether Westford was unusual.','You were using the additional comparison to understand how distinctive Westford’s response was.'],
          ['c4','I wanted another case that could be compared directly with Westford.','You were prioritising a close comparison with the weaker-response case.']
        ],
        signals:{}
      }
    ],
    reflection:'What finding would most seriously challenge your current explanation?',
    confidence:true,
    transition:'The research identifies an organisation that provides a more difficult comparison.'
  },
  {
    id:'d6',
    label:'Decision 6 of 8',
    title:'What does Eastborough mean for your explanation?',
    stage:'Refining the explanation',
    evidenceTitle:'Evidence round 4: Eastborough',
    evidence:[
      'Eastborough has operated a cross-functional coordination group for four years. Its membership and formal responsibilities are similar to Northbridge’s. Yet Eastborough also responded poorly to the disruption.',
      'An internal review records that senior leaders received an early warning that the disruption could affect one of the organisation’s largest services. They considered the information uncertain and decided not to circulate it beyond a small group until they received confirmation.',
      'The coordination group continued to meet, but its members did not receive the early warning.',
      'A regional manager later explained: “The structure existed. We were meeting. But we were discussing yesterday’s problem because we didn’t know about tomorrow’s.”',
      'A senior leader defended the decision: “At the time, the information was provisional. Sharing every possible risk can create unnecessary disruption. We made the decision we thought was proportionate.”',
      'The evidence does not support a simple conclusion that Eastborough’s leaders acted irrationally. It shows that a judgement about uncertain information affected what the coordination group was able to do.'
    ],
    prompt:'How should this case affect the explanation?',
    options:[
      {
        id:'a', label:'The Eastborough case shows that coordination is not a useful explanation of organisational response.',
        baseFeedback:{value:'You have taken the contradictory case seriously and are willing to reconsider the value of the emerging explanation.',consider:'Eastborough shows that coordination alone was not sufficient. It does not necessarily show that coordination was irrelevant. The case may instead identify another condition that affects whether coordination is useful.'},
        reasons:[
          ['a1','The case contradicts the main relationship I was proposing.','You are giving substantial weight to a case that does not fit the expected relationship. The next question is whether the case rejects the explanation or shows that the explanation was too broad.'],
          ['a2','A useful explanation should account for Eastborough as well.','You expect the explanation to account for variation across the cases. Refinement may sometimes achieve this without abandoning the earlier evidence.'],
          ['a3','The new information makes another explanation more plausible.','You are comparing explanatory accounts rather than preserving the current one by default.'],
          ['a4','I no longer think coordination adds enough to the explanation.','You are judging the explanatory contribution of coordination against the full set of evidence.']
        ],
        signals:{REV:2}
      },
      {
        id:'b', label:'The explanation needs to be refined to consider the circumstances in which coordination arrangements can support an effective response.',
        baseFeedback:{value:'Eastborough suggests that the presence of a coordination structure is not enough. The case directs attention towards what happens within that structure.',consider:'The refined explanation now needs to distinguish among several possibilities, including information sharing, interpretation of uncertainty and authority to act.'},
        reasons:[
          ['b1','Relevant information may need to reach the people involved.','You are refining the explanation around information access.'],
          ['b2','People may also need authority to act on the information they receive.','You are adding a second condition concerning what participants can do once information is available.'],
          ['b3','The presence of a formal structure tells us little about how it works in practice.','You are distinguishing formal arrangements from how those arrangements actually operate.'],
          ['b4','More than one of these conditions appears to matter.','You are moving towards an explanation in which several conditions may work together.']
        ],
        signals:{REV:2,EXPL:2,COND:2,CAL:1}
      },
      {
        id:'c', label:'Eastborough is sufficiently different that it should not be included in the comparison.',
        baseFeedback:{value:'Excluding a case can be methodologically appropriate when it falls outside the criteria needed for a meaningful comparison.',consider:'The reason for exclusion matters. A case should not be removed simply because it complicates the explanation.'},
        reasons:[
          ['c1','It does not meet the case-selection criteria established for the study.','You are applying an existing design rule. If the criterion was specified independently of the finding, exclusion may be methodologically justified.'],
          ['c2','The disruption it experienced is not sufficiently comparable.','You are questioning whether the cases address the same research problem. Comparability is a legitimate basis for deciding whether evidence belongs in the analysis.'],
          ['c3','Important organisational differences make the comparison inappropriate.','You are treating contextual difference as a possible limit on comparison. The next step is to specify which difference matters and why.'],
          ['c4','Including it would make the findings less clear.','Clarity is useful, but difficult cases can also reveal where an explanation is too broad. It may be worth separating analytical clarity from whether the case provides relevant evidence.'],
          ['c5','It does not fit the pattern emerging from the other organisations.','A case that does not fit the pattern may be especially informative. Before excluding it, it is useful to ask whether it falls outside the study design or challenges the explanation.']
        ],
        signals:{}
      }
    ],
    reflection:'What has Eastborough helped you understand that Northbridge and Westford could not?',
    transition:'You now review the evidence across all three organisations before deciding what the study can reasonably conclude.'
  },
  {
    id:'d7',
    label:'Decision 7 of 8',
    title:'What can you reasonably conclude?',
    stage:'Drawing conclusions',
    evidenceTitle:'Evidence round 5: what the study currently shows',
    evidence:[
      'Northbridge had established cross-functional arrangements, information shared across several organisational levels, some local authority to make changes and a comparatively rapid response.',
      'Westford’s current response involved coordination established after the disruption began, more centralised approval, disagreement among senior managers and a slower response.',
      'During Westford’s earlier successful transition, temporary cross-functional implementation arrangements and greater operational discretion were present.',
      'Eastborough had established cross-functional arrangements, but important early information was restricted to senior leaders. The coordination group continued to operate without that information and the response was comparatively poor.',
      'Several explanations remain possible, including information sharing, authority to act, previous experience, leadership judgement, organisational relationships and differences the study has not measured.',
      'The study cannot establish with certainty that one factor caused the observed outcomes.'
    ],
    prompt:'Which conclusion is best supported by the evidence available?',
    options:[
      {
        id:'a', label:'Organisations with cross-functional coordination structures respond more effectively to disruption.',
        baseFeedback:{value:'This conclusion is clear and captures part of the observed pattern.',consider:'Eastborough shows that coordination structures can exist without an effective response. The claim is therefore broader than the evidence currently supports unless additional conditions are specified.'},
        reasons:[
          ['a1','The overall pattern still points in this direction.','You are giving greater weight to the broad pattern than to the case that complicates it. The conclusion should make clear how that contrary evidence is treated.'],
          ['a2','The exceptions do not outweigh the wider evidence.','You are judging the balance of evidence across cases. The important question is whether the conclusion still accurately represents the circumstances in which the relationship appears to hold.'],
          ['a3','I wanted the conclusion to remain clear and useful.','Clarity is valuable, but usefulness also depends on representing important qualifications where they materially affect the claim.'],
          ['a4','I think the evidence is strong enough for this claim.','You have a relatively high level of confidence in the broader relationship. The limitation question below is important for checking the scope of that confidence.']
        ],
        signals:{CAL:-1}
      },
      {
        id:'b', label:'Cross-functional coordination may support organisational adaptation when relevant information can be shared, interpreted and used to inform action.',
        baseFeedback:{value:'This conclusion reflects both the recurring pattern and the evidence that complicated it. It identifies circumstances that appear to affect whether coordination is useful.',consider:'The study still cannot establish that these conditions cause better adaptation in every setting. The wording should therefore remain proportionate to the comparative evidence available.'},
        reasons:[
          ['b1','It reflects the pattern across all of the cases.','You selected a conclusion that attempts to account for both the supportive and contradictory evidence.'],
          ['b2','It captures the conditions that seem to matter.','You are incorporating what the Eastborough case added to the explanation.'],
          ['b3','It is more precise than saying coordination is always beneficial.','You are limiting the claim to what the current evidence can reasonably support.'],
          ['b4','It leaves room for further research.','You recognise that a useful conclusion can be informative without claiming that the explanation is final.']
        ],
        signals:{CAL:2,COND:2,EXPL:2}
      },
      {
        id:'c', label:'Northbridge responded more effectively than Westford and Eastborough, but the current evidence is not sufficient to make a wider explanatory claim.',
        baseFeedback:{value:'This conclusion stays close to what can be observed directly and avoids extending the claim beyond what you think the evidence can support.',consider:'The study has also developed evidence about information sharing, coordination and authority. The question is whether the evidence is too limited for any explanatory claim or whether it supports a carefully qualified one.'},
        reasons:[
          ['c1','I do not think the study can establish causation.','You are distinguishing the observed relationship from a causal claim. A qualified explanation can still sometimes be made without claiming definitive causation.'],
          ['c2','There are too few cases to make a wider claim.','You are cautious about extending the conclusion beyond the cases. The question is whether case number limits all explanation or mainly the breadth of generalisation.'],
          ['c3','There are still too many alternative explanations.','You are giving weight to unresolved alternatives. This can justify a cautious conclusion if those alternatives materially affect the interpretation.'],
          ['c4','I wanted the conclusion to stay very close to the direct evidence.','You were prioritising caution in the final claim. The next step is to decide what further study could reasonably add.']
        ],
        signals:{CAL:1,UNC:1}
      }
    ],
    reflection:'What can the study establish, and what can it not establish?',
    confidence:true,
    limitation:true,
    transition:'The final decision asks how you would develop the research from here.'
  },
  {
    id:'d8',
    label:'Decision 8 of 8',
    title:'What should the next study investigate?',
    stage:'Developing the research',
    evidenceTitle:'What remains unresolved',
    evidence:[
      'The study suggests that organisational adaptation may depend partly on how information moves through coordination arrangements and whether people have sufficient authority to act on it.',
      'Important questions remain. Similar patterns may or may not occur in other sectors. Formal coordination may matter differently from informal relationships. The importance of authority may depend on the type of disruption. It is also possible that already adaptable organisations are more likely to create stronger coordination arrangements.'
    ],
    prompt:'You can develop one follow-on study. What would you prioritise?',
    options:[
      {
        id:'a', label:'Study more organisations with arrangements similar to Northbridge to establish whether the same pattern appears elsewhere.',
        baseFeedback:{value:'Additional similar cases can show whether the observed pattern appears beyond the original setting.',consider:'If most new cases resemble the successful case, the next study may provide less information about the circumstances in which the explanation does not hold.'},
        reasons:[
          ['a1','I wanted to establish whether the pattern could be repeated.','You are prioritising evidence that the observed relationship is not unique to the original cases.'],
          ['a2','I wanted to see whether the explanation might apply more widely.','You are interested in how far the emerging account extends beyond the original comparison.'],
          ['a3','I wanted more confidence before changing the design.','You prefer to strengthen the existing evidence before introducing greater variation.'],
          ['a4','This seemed like the most feasible next study.','You are considering practical constraints alongside the research question. Feasibility is a legitimate part of research design, provided the study still addresses a useful uncertainty.']
        ],
        signals:{}
      },
      {
        id:'b', label:'Compare organisations with different combinations of information sharing, coordination and authority to examine when the explanation appears to hold.',
        baseFeedback:{value:'This design would allow the next study to examine the circumstances in which the proposed explanation appears to work and where it may need further revision.',consider:'A more varied comparison can strengthen explanation, but it also increases design complexity. The cases and measures would need to be selected carefully.'},
        reasons:[
          ['b1','I wanted to know when the explanation applies.','You are focusing the next study on the circumstances that shape the explanation.'],
          ['b2','I wanted to know which of the identified conditions matters most.','You are seeking greater precision about the relative contribution of the conditions identified.'],
          ['b3','I wanted to understand how the conditions work together.','You are treating the explanation as involving a combination of factors rather than one isolated relationship.'],
          ['b4','I wanted to see whether the same process occurs in a different context.','You are extending the comparison while retaining attention to the process identified in the first study.']
        ],
        signals:{EXPL:2,COND:2,ALT:1}
      },
      {
        id:'c', label:'Develop a larger survey examining relationships between coordination arrangements and organisational performance.',
        baseFeedback:{value:'A larger survey could show whether relationships identified in the comparative study appear across a wider group of organisations.',consider:'What the survey can establish depends on the research design, measures and analysis. A larger sample on its own does not establish that one factor caused another.'},
        reasons:[
          ['c1','I wanted to test whether coordination and organisational response are associated across more organisations.','You are using a different design to examine whether the relationship appears at a larger scale.'],
          ['c2','I wanted to establish how common particular organisational arrangements are.','You are asking a prevalence question that the original comparative study cannot answer.'],
          ['c3','I wanted to establish whether the proposed explanation is correct.','A survey can provide valuable evidence about relationships across a larger sample. Whether it can establish the explanation as correct depends on design, measurement and the alternatives considered.'],
          ['c4','I wanted to know whether the relationships differ between types of organisation.','You are using a larger study to examine variation across organisational settings.']
        ],
        signals:{PROG:1}
      }
    ],
    reflection:'What would the next study need to establish that this study cannot?',
    transition:'You have completed the research problem. Before seeing your profile, you will reflect on the reasoning that guided your decisions.'
  }
];

export const FINAL_REFLECTION = {
  priorities:[
    'Understand the research problem fully.',
    'Keep the study focused.',
    'Avoid reaching conclusions too early.',
    'Make sure explanations were supported by the evidence.',
    'Consider alternative explanations.',
    'Make progress with the information available.',
    'Identify evidence that could change my view.',
    'Keep conclusions proportionate to the evidence.',
    'Understand how and why the observed differences occurred.'
  ],
  reconsider:[
    'New evidence that contradicted it.',
    'A stronger alternative explanation.',
    'Evidence from another perspective.',
    'Information about the context.',
    'Recognition that my explanation was too broad.',
    'I generally needed several pieces of conflicting evidence before reconsidering.'
  ]
};

export const CUSTOM_REASON = ['other','Something else.','You gave a reason that is not represented by the predefined options. Your own explanation should therefore be treated as the primary basis for understanding this decision.'];

export function optionFor(decision, optionId){
  return decision.options.find(o=>o.id===optionId);
}
export function reasonsFor(option){
  return [...option.reasons, CUSTOM_REASON];
}
export function reasonFor(option, reasonId){
  return reasonsFor(option).find(r=>r[0]===reasonId);
}
export function composeFeedback(decision, optionId, reasonId){
  const option=optionFor(decision,optionId);
  const reason=reasonFor(option,reasonId);
  return {
    heading:'What you can learn from this decision',
    value:option.baseFeedback.value,
    reason:reason?.[2]||'',
    consider:option.baseFeedback.consider,
    transition:decision.transition
  };
}

export function buildProfile(records, finalReflection={}){
  const totals={ALT:0,FOC:0,CONT:0,DIV:0,REV:0,CHAL:0,EXPL:0,COND:0,CAL:0,UNC:0,PROG:0};
  const evidence={};
  for(const rec of records){
    const d=DECISIONS.find(x=>x.id===rec.decisionId);
    const o=d && optionFor(d,rec.optionId);
    if(!o) continue;
    for(const [k,v] of Object.entries(o.signals||{})){
      totals[k]=(totals[k]||0)+v;
      (evidence[k] ||= []).push(d.id);
    }
    if(rec.reasonId){
      if(rec.decisionId==='d1' && rec.reasonId==='b3'){totals.ALT+=1;totals.EXPL+=1;}
      if(rec.decisionId==='d2' && ['b1','b4'].includes(rec.reasonId)){totals.EXPL+=1;}
      if(rec.decisionId==='d3' && ['b1','b3'].includes(rec.reasonId)){totals.CONT+=1;}
      if(rec.decisionId==='d5' && ['b2','b4'].includes(rec.reasonId)){totals.CHAL+=1;totals.COND+=1;}
      if(rec.decisionId==='d6' && rec.optionId==='c' && ['c4','c5'].includes(rec.reasonId)){totals.CHAL-=1;totals.REV-=1;}
      if(rec.decisionId==='d7' && rec.optionId==='a' && (rec.confidence||0)>=6){totals.CAL-=1;}
      if(rec.decisionId==='d8' && rec.optionId==='c' && rec.reasonId==='c3'){totals.CAL-=1;}
    }
  }

  const priorities=[];
  if(totals.EXPL>=5) priorities.push('You often focused on explaining how and why the observed differences had arisen, rather than stopping at a description of the outcomes.');
  if(totals.ALT>=4) priorities.push('You repeatedly kept more than one explanation under consideration when the available evidence allowed different interpretations.');
  if(totals.CONT>=3) priorities.push('You gave considerable attention to the circumstances surrounding the cases and to how those circumstances might affect the explanation.');
  if(totals.CAL>=4) priorities.push('You frequently considered how closely the strength of a conclusion should match the evidence available.');
  if(!priorities.length) priorities.push('Your decisions varied according to the research problem at each stage. No single priority was strong enough to describe as a repeated pattern.');

  const strengths=[];
  if(totals.REV>=4) strengths.push({title:'You were willing to reconsider an explanation',text:'Across several decisions, new information affected the way you understood the research problem. You did not treat an early explanation as fixed.'});
  if(totals.CHAL>=3) strengths.push({title:'You considered evidence that could challenge the developing explanation',text:'You selected or valued evidence that could require the explanation to be revised, not only evidence that was consistent with it.'});
  if(totals.EXPL>=6) strengths.push({title:'You developed the explanation as the study progressed',text:'Your later decisions increasingly addressed the processes and circumstances that might account for the observed differences.'});
  if(totals.CAL>=5) strengths.push({title:'You kept conclusions close to the evidence',text:'Your decisions generally distinguished between what the cases showed directly and what would require a broader or stronger claim.'});
  if(totals.DIV>=2) strengths.push({title:'You considered evidence from different perspectives',text:'You recognised that organisational decisions, experiences and outcomes may need to be examined through more than one source of evidence.'});

  let development=null;
  const d5=records.find(r=>r.decisionId==='d5');
  const d6=records.find(r=>r.decisionId==='d6');
  const d7=records.find(r=>r.decisionId==='d7');
  if(d5 && ['a','c'].includes(d5.optionId) && d6?.optionId==='c' && ['c4','c5'].includes(d6.reasonId)){
    development='Across several decisions, you preferred evidence that was consistent with the explanation already developing. That can help establish whether a pattern is repeated. It may also be useful to ask which case or finding would provide the most serious challenge to the explanation you currently find convincing.';
  } else if(totals.CAL<=0 && d7?.optionId==='a'){
    development='You were willing to make a clear conclusion from the pattern developing across the cases. A useful question for your own research is which part of a conclusion is directly supported by the study and which part would require further evidence.';
  }

  let developmentOverTime='';
  const early=records.slice(0,2).map(r=>r.optionId).join('');
  if(records.length>=8){
    if((records.find(r=>r.decisionId==='d3')?.optionId==='b'||records.find(r=>r.decisionId==='d3')?.optionId==='c') && records.find(r=>r.decisionId==='d6')?.optionId==='b'){
      developmentOverTime='As the study developed, you allowed new evidence to change the explanation. By the later stages, your decisions were giving more attention to the circumstances in which the explanation might apply.';
    } else if(early){
      developmentOverTime='Your approach changed according to the information available at each stage. The profile therefore focuses on the patterns that appeared more than once rather than treating any single decision as representative.';
    }
  }

  return {
    priorities:priorities.slice(0,2),
    strengths:strengths.slice(0,3),
    development,
    developmentOverTime,
    finalQuestion: development
      ? 'What evidence would be important enough to make you reconsider an explanation you already find convincing?'
      : 'What would most improve the explanation you are currently developing in your own research?'
  };
}

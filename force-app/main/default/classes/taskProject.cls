public with sharing class taskProject {
    public void pojectTask(){
        List<Project> projects = [select Id, Name , (select Id, Name, Status__c from Task__c) from Project__c];
        Map<Id,List<Task__c>> projectAndRelatedTasks = new Map<Id,List<Task__c>>();
        for(Project__C pr:projects){
            projectAndRelatedTasks.put(pr.Id,pr.Task__c);
        }
    
        Map<Id,Integer> projectTaskSize= new Map<Id,Integer>();
        for(Id projectId:projectAndRelatedTasks.keysets()){
            List<Task__C> tasks= new List<Task__C>();
            tasks=projectAndRelatedTasks.get(projectId);
            projectTaskSize.put(projectId,tasks.size());
        }
    
        Id specificprojectId='123';
        if(!projectAndRelatedTasks.isEmpty()){
            if(projectAndRelatedTasks.containskey(specificprojectId)){
                List<Task__C> tasksToUpdate=new List<Task__C>();
                tasksTOUpdate=projectAndRelatedTasks.get(specificprojectId);
                for(Task__c task:tasksToUpdate){
                    task.Status__c='Completed';
    
                }
                update tasksToUpdate;
            }
        }

        for(Id remainingPro:projectAndRelatedTasks){
                System.debug('Remaining Projects: '+remainingPro, 'Remaining Tasks: '+projectAndRelatedTasks.get(remainingPro));
            }
        }
    }
    
    
    